/**
 * Profile uploads are checked by their bytes, not by the client's claimed
 * type. A refused file must never reach Cloudinary.
 */
import { describe, it, expect, vi } from 'vitest'
import { PassThrough, Writable } from 'node:stream'
import { Buffer } from 'node:buffer'
import { setImmediate } from 'node:timers'
import { sniffFileKind } from '../../utils/fileSignature.js'
import { uploadToCloudinary } from '../../modules/profile/services/profileService.js'

const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0x0d, 1, 2, 3])
const PDF = Buffer.from('%PDF-1.7\n%âãÏÓ\n1 0 obj')
const DOCX = Buffer.from([0x50, 0x4b, 0x03, 0x04, 0x14, 0, 6, 0, 8, 0, 0, 0, 0x21])
const WEBP = Buffer.concat([Buffer.from('RIFF'), Buffer.from([1, 2, 3, 4]), Buffer.from('WEBPVP8 ')])
const HTML = Buffer.from('<!doctype html><script>alert(document.cookie)</script>')
const SVG = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" onload="alert(1)"/>')

// Records what reached "Cloudinary" and with which options.
const fakeUploader = () => {
  const calls = []
  return {
    calls,
    upload_stream: vi.fn((options, done) => {
      const call = { options, bytes: [] }
      calls.push(call)
      return new Writable({
        write(chunk, _enc, cb) { call.bytes.push(chunk); cb() },
        final(cb) { done(null, { secure_url: 'https://res.cloudinary.com/x/up.bin' }); cb() },
      })
    }),
  }
}

// Feeds the bytes in small chunks, like a real multipart stream does.
const fileStream = (buf, chunkSize = 4) => {
  const s = new PassThrough()
  setImmediate(() => {
    for (let i = 0; i < buf.length; i += chunkSize) s.write(buf.subarray(i, i + chunkSize))
    s.end()
  })
  return s
}

describe('sniffFileKind', () => {
  it('recognises images and documents by their magic bytes', () => {
    expect(sniffFileKind(PNG)).toBe('image')
    expect(sniffFileKind(WEBP)).toBe('image')
    expect(sniffFileKind(Buffer.from([0xff, 0xd8, 0xff, 0xe0]))).toBe('image')
    expect(sniffFileKind(Buffer.from('GIF89a......'))).toBe('image')
    expect(sniffFileKind(PDF)).toBe('document')
    expect(sniffFileKind(DOCX)).toBe('document')
  })

  it('refuses HTML, SVG, empty and truncated files', () => {
    expect(sniffFileKind(HTML)).toBeNull()
    expect(sniffFileKind(SVG)).toBeNull()
    expect(sniffFileKind(Buffer.alloc(0))).toBeNull()
    expect(sniffFileKind(Buffer.from('RIFF'))).toBeNull()
  })
})

describe('uploadToCloudinary', () => {
  it('uploads a real image whole, as resource_type image', async () => {
    const up = fakeUploader()
    await expect(uploadToCloudinary(fileStream(PNG), 'image', up)).resolves.toMatch(/^https:/)
    expect(up.calls[0].options.resource_type).toBe('image')
    expect(Buffer.concat(up.calls[0].bytes)).toEqual(PNG)
  })

  it('uploads a PDF or Word CV', async () => {
    for (const doc of [PDF, DOCX]) {
      const up = fakeUploader()
      await expect(uploadToCloudinary(fileStream(doc), 'document', up)).resolves.toBeTruthy()
      expect(Buffer.concat(up.calls[0].bytes)).toEqual(doc)
    }
  })

  it.each([
    ['HTML as a profile image', HTML, 'image'],
    ['SVG as a profile image', SVG, 'image'],
    ['HTML as a CV', HTML, 'document'],
    ['a PDF as a profile image', PDF, 'image'],
    ['an image as a CV', PNG, 'document'],
    ['a tiny file', Buffer.from('hi'), 'image'],
  ])('refuses %s with a 400, before Cloudinary sees it', async (_label, buf, kind) => {
    const up = fakeUploader()
    await expect(uploadToCloudinary(fileStream(buf), kind, up)).rejects.toMatchObject({ status: 400 })
    expect(up.upload_stream).not.toHaveBeenCalled()
  })
})
