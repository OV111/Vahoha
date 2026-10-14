import { describe, it, expect } from 'vitest'
import { SolutionGuard, OMITTED_NOTE } from '../../modules/ai-agent/services/solutionGuard.js'

// Runs a whole reply through the guard in chunks of `size` characters, the way
// a token stream would deliver it.
const run = (text, size = 3, opts) => {
  const guard = new SolutionGuard(opts)
  let out = ''
  for (let i = 0; i < text.length; i += size) out += guard.push(text.slice(i, i + size))
  return out + guard.flush()
}

const fence = (lines) => ['Here you go:', '```js', ...lines, '```', 'Try it.'].join('\n')

describe('SolutionGuard', () => {
  it('passes prose through untouched, whatever the chunk size', () => {
    const text = 'What do you expect `split` to return here?\nThink about empty lines.'
    for (const size of [1, 2, 7, 100]) expect(run(text, size)).toBe(text)
  })

  it('keeps a short code block (quoting a learner line is fine)', () => {
    const text = fence(['const a = 1', 'const b = 2'])
    expect(run(text)).toBe(text)
  })

  it('cuts a long code block at the cap and says so once', () => {
    const body = Array.from({ length: 12 }, (_, i) => `  step${i}()`)
    const out = run(fence(body), 5, { maxLines: 4 })
    expect(out).toContain('step3()')
    expect(out).not.toContain('step4()')
    expect(out).not.toContain('step11()')
    expect(out.split(OMITTED_NOTE).length - 1).toBe(1)
    // Prose after the block still arrives and the fence is closed
    expect(out.trimEnd().endsWith('Try it.')).toBe(true)
    expect(out).toContain('```\nTry it.')
  })

  it('is not fooled by a fence marker split across chunks', () => {
    const body = Array.from({ length: 8 }, (_, i) => `line${i}`)
    for (const size of [1, 2, 3, 4]) {
      const out = run(fence(body), size, { maxLines: 2 })
      expect(out).not.toContain('line5')
      expect(out).toContain('Try it.')
    }
  })

  it('caps each block independently', () => {
    const block = (tag) => ['```', ...Array.from({ length: 6 }, (_, i) => `${tag}${i}`), '```'].join('\n')
    const out = run(`${block('a')}\nand\n${block('b')}`, 4, { maxLines: 3 })
    expect(out).toContain('a2')
    expect(out).not.toContain('a3')
    expect(out).toContain('b2')
    expect(out).not.toContain('b3')
  })

  it('releases an unfinished final line on flush', () => {
    const guard = new SolutionGuard()
    expect(guard.push('no newline at the end') + guard.flush()).toBe('no newline at the end')
  })
})
