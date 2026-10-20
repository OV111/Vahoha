import { describe, it, expect } from 'vitest'
import {
  MAX_OUTPUT_TOKENS,
  MIN_OUTPUT_TOKENS,
  codeCharsForLimit,
  estimateTokens,
  outputTokenBudget,
  parseTpmLimit,
  reasoningEffortFor,
} from '../../modules/capstone/lib/tokenBudget.js'

describe('parseTpmLimit', () => {
  it('reads a positive number and treats anything else as unset', () => {
    expect(parseTpmLimit('8000')).toBe(8000)
    expect(parseTpmLimit(undefined)).toBeNull()
    expect(parseTpmLimit('')).toBeNull()
    expect(parseTpmLimit('abc')).toBeNull()
    expect(parseTpmLimit('-5')).toBeNull()
  })
})

describe('outputTokenBudget', () => {
  it('keeps the full ceiling when no limit is set', () => {
    expect(outputTokenBudget(50_000, null)).toBe(MAX_OUTPUT_TOKENS)
  })

  it('never asks for more output than the limit leaves after the input', () => {
    const budget = outputTokenBudget(4000, 8000)
    expect(4000 + budget).toBeLessThan(8000)
  })

  it('caps at the ceiling when the limit is generous', () => {
    expect(outputTokenBudget(1000, 250_000)).toBe(MAX_OUTPUT_TOKENS)
  })

  it('goes below the minimum when the input alone is too big', () => {
    expect(outputTokenBudget(7000, 8000)).toBeLessThan(MIN_OUTPUT_TOKENS)
  })
})

describe('codeCharsForLimit', () => {
  it('leaves room for the output and the prompt, so a full code budget still fits', () => {
    const limit = 8000
    const codeTokens = estimateTokens('x'.repeat(codeCharsForLimit(limit)))
    expect(outputTokenBudget(codeTokens + 2000, limit)).toBeGreaterThanOrEqual(MIN_OUTPUT_TOKENS)
  })

  it('gives a short prompt more room for code than the worst case', () => {
    expect(codeCharsForLimit(8000, 1400)).toBeGreaterThan(codeCharsForLimit(8000))
  })

  it('is zero for a limit too small for any review', () => {
    expect(codeCharsForLimit(1000)).toBe(0)
  })
})

describe('reasoningEffortFor', () => {
  it('lowers reasoning under a small limit only', () => {
    expect(reasoningEffortFor(8000)).toBe('low')
    expect(reasoningEffortFor(250_000)).toBe('medium')
    expect(reasoningEffortFor(null)).toBe('medium')
  })
})
