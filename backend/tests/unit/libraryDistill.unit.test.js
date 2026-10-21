import { describe, it, expect } from 'vitest'
import {
  PROMPT_VERSION,
  buildDistillMessages,
  estimatePromptTokens,
  parseDistillReply,
  toConceptKey,
} from '../../modules/library/lib/distill.js'

const source = {
  title: 'A Book',
  author: 'An Author',
  description: 'About the book.',
  url: 'https://example.com/book',
  is_free: false,
  difficulty: 'beginner',
  paths: ['Frontend Developer'],
  topics: ['typescript'],
  layerIds: ['frontend-dev-6'],
}

const concept = (overrides = {}) => ({
  key: 'array-types',
  chapter: 'Arrays',
  order: 0,
  title: 'Typing an array',
  summary: 'Put [] after the element type.',
  why: 'Every list is an array.',
  detail: 'More detail.',
  roles: ['beginner'],
  keep: true,
  ...overrides,
})

const reply = (concepts) => JSON.stringify({ concepts })

describe('buildDistillMessages', () => {
  const messages = buildDistillMessages({
    rubric: 'Keep it if a developer hits it this year.',
    chapterName: 'Arrays',
    chapterText: 'Chapter text here.',
  })
  const user = messages[1].content

  it('passes the rubric verbatim', () => {
    expect(user).toContain('Keep it if a developer hits it this year.')
  })

  it('requires own words and own examples', () => {
    expect(user).toMatch(/own words/i)
    expect(user).toMatch(/never copy a sentence/i)
  })

  it('confines outside facts to beyondBook', () => {
    expect(user).toMatch(/ONLY in "beyondBook"/)
  })

  it('includes the chapter text and name', () => {
    expect(user).toContain('Chapter text here.')
    expect(user).toContain('Set "chapter" to exactly: Arrays')
  })

  it('estimates a positive token count', () => {
    expect(estimatePromptTokens(messages)).toBeGreaterThan(0)
  })
})

describe('parseDistillReply', () => {
  it('accepts a valid reply and stamps source and prompt version', () => {
    const result = parseDistillReply(reply([concept()]), { source })
    expect(result.ok).toBe(true)
    expect(result.data.source.title).toBe('A Book')
    expect(result.data.promptVersion).toBe(PROMPT_VERSION)
    expect(result.data.concepts).toHaveLength(1)
  })

  it('accepts JSON wrapped in ```json fences', () => {
    const result = parseDistillReply('```json\n' + reply([concept()]) + '\n```', { source })
    expect(result.ok).toBe(true)
  })

  it('rejects a reply that is not JSON', () => {
    const result = parseDistillReply('Here are your concepts!', { source })
    expect(result.ok).toBe(false)
    expect(result.issues).toEqual(['Reply is not valid JSON'])
  })

  it('rejects schema-invalid concepts with readable issues', () => {
    const result = parseDistillReply(reply([concept({ roles: ['wizard'] })]), { source })
    expect(result.ok).toBe(false)
    expect(result.issues.some((i) => i.startsWith('concepts.0.roles'))).toBe(true)
  })

  it('rejects a dropped concept without a dropReason', () => {
    const result = parseDistillReply(reply([concept({ keep: false })]), { source })
    expect(result.ok).toBe(false)
  })

  it('rejects duplicate concept keys', () => {
    const result = parseDistillReply(reply([concept(), concept({ order: 1 })]), { source })
    expect(result.ok).toBe(false)
  })

  it('rejects a reply with no concepts array', () => {
    expect(parseDistillReply('{"items": []}', { source }).ok).toBe(false)
  })

  it('ignores a source or version the model tries to supply', () => {
    const sneaky = JSON.stringify({ source: { title: 'Other' }, promptVersion: 'x', concepts: [concept()] })
    const result = parseDistillReply(sneaky, { source })
    expect(result.data.source.title).toBe('A Book')
    expect(result.data.promptVersion).toBe(PROMPT_VERSION)
  })
})

describe('toConceptKey', () => {
  it('turns camelCase, snake_case and spaces into a kebab slug', () => {
    expect(toConceptKey('tupleInference')).toBe('tuple-inference')
    expect(toConceptKey('tuple_inference')).toBe('tuple-inference')
    expect(toConceptKey(' Tuple Inference! ')).toBe('tuple-inference')
  })

  it('caps the length without leaving a trailing dash', () => {
    const key = toConceptKey('a-'.repeat(40))
    expect(key.length).toBeLessThanOrEqual(60)
    expect(key.endsWith('-')).toBe(false)
  })
})
