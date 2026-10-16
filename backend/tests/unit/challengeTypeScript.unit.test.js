import { describe, it, expect } from 'vitest'
import { stripTypes } from '../../modules/coding-challenges/lib/typescript.js'
import { pickSubmissionSource } from '../../modules/coding-challenges/lib/submissionSource.js'
import {
  mainFileName,
  exportNameOf,
  toTypeScriptStarter,
  isChallengeLanguage,
  TS_STARTER_HEADER,
} from '../../../constants/challengeLanguages.js'

describe('stripTypes', () => {
  it('removes annotations, generics and type-only declarations', () => {
    const { code } = stripTypes(`
      type Id = string
      interface Box<T> { value: T }
      function first<T>(items: T[]): T { return items[0] }
      module.exports = first
    `)
    expect(code).not.toMatch(/interface|type Id|: T\[\]/)
    const module_ = { exports: null }
    new Function('module', code)(module_)
    expect(module_.exports([7, 8])).toBe(7)
  })

  it('erases the starter header so the code still runs', () => {
    const { code } = stripTypes(toTypeScriptStarter('function f() { return 1 }\nmodule.exports = f;'))
    const module_ = { exports: null }
    new Function('module', code)(module_)
    expect(module_.exports()).toBe(1)
  })

  it('does not fail on a type error, because types are not checked', () => {
    const { code, error } = stripTypes('const n: number = "oops"; module.exports = n')
    expect(error).toBeUndefined()
    expect(code).toContain('"oops"')
  })

  it('reports a syntax error instead of throwing', () => {
    const result = stripTypes('function ( { broken')
    expect(result.error).toBeTruthy()
    expect(result.code).toBeUndefined()
  })
})

describe('challenge language helpers', () => {
  it('derives the file name for each language', () => {
    expect(mainFileName('debounce.js', 'ts')).toBe('debounce.ts')
    expect(mainFileName('debounce.js', 'js')).toBe('debounce.js')
    expect(exportNameOf('debounce.ts')).toBe('debounce')
  })

  it('adds the TypeScript header once', () => {
    const once = toTypeScriptStarter('let a = 1')
    expect(once.startsWith(TS_STARTER_HEADER)).toBe(true)
    expect(toTypeScriptStarter(once)).toBe(once)
  })

  it('knows the supported languages', () => {
    expect(isChallengeLanguage('js')).toBe(true)
    expect(isChallengeLanguage('ts')).toBe(true)
    expect(isChallengeLanguage('python')).toBe(false)
  })
})

describe('pickSubmissionSource', () => {
  const challenge = { starterFiles: [{ name: 'add.js' }] }
  const draft = [
    { name: 'add.js', code: 'function add(a, b) { return a + b }\nmodule.exports = add' },
    { name: 'add.ts', code: 'function add(a: number, b: number): number { return a + b }\nmodule.exports = add' },
  ]

  it('defaults to the JavaScript file, unchanged', () => {
    const s = pickSubmissionSource(challenge, draft)
    expect(s.fileName).toBe('add.js')
    expect(s.exportName).toBe('add')
    expect(s.code).toBe(draft[0].code)
  })

  it('grades the TypeScript file with types removed', () => {
    const s = pickSubmissionSource(challenge, draft, 'ts')
    expect(s.fileName).toBe('add.ts')
    expect(s.code).not.toMatch(/: number/)
  })

  it('rejects an unknown language with 400', () => {
    expect(() => pickSubmissionSource(challenge, draft, 'cobol')).toThrow(/Unknown language/)
    try {
      pickSubmissionSource(challenge, draft, 'cobol')
    } catch (e) {
      expect(e.status).toBe(400)
    }
  })

  it('rejects an empty or missing file for the chosen language', () => {
    expect(() => pickSubmissionSource(challenge, [draft[0]], 'ts')).toThrow(/no code to submit/)
    expect(() => pickSubmissionSource(challenge, [{ name: 'add.ts', code: '   ' }], 'ts')).toThrow(/no code to submit/)
  })

  it('reports TypeScript syntax errors as a 400 with the message', () => {
    try {
      pickSubmissionSource(challenge, [{ name: 'add.ts', code: 'function ( {' }], 'ts')
      throw new Error('should have thrown')
    } catch (e) {
      expect(e.status).toBe(400)
      expect(e.message).toMatch(/^TypeScript syntax error:/)
    }
  })

  it('ignores a file name the attempt invented', () => {
    expect(() =>
      pickSubmissionSource(challenge, [{ name: 'evil.js', code: 'module.exports = 1' }]),
    ).toThrow(/no code to submit/)
  })
})
