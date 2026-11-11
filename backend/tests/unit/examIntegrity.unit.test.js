import { describe, it, expect } from 'vitest'
import { pickQuestions } from '../../modules/exams/services/examEngineService.js'

const bank = Array.from({ length: 60 }, (_, i) => ({ id: `l1-q${i + 1}` }))
const idsOf = (qs) => qs.map((q) => q.id)

describe('pickQuestions', () => {
  it('serves no seen question while enough unseen ones remain', () => {
    const seen = new Set(idsOf(bank.slice(0, 15)))
    const picked = pickQuestions(bank, seen, 15)
    expect(picked).toHaveLength(15)
    expect(picked.some((q) => seen.has(q.id))).toBe(false)
  })

  it('takes every unseen question, then fills from seen ones', () => {
    const seen = new Set(idsOf(bank.slice(0, 50)))
    const picked = pickQuestions(bank, seen, 15)
    const unseenPicked = picked.filter((q) => !seen.has(q.id))
    expect(picked).toHaveLength(15)
    expect(unseenPicked).toHaveLength(10)
  })

  it('never returns duplicates and handles a bank smaller than n', () => {
    const picked = pickQuestions(bank.slice(0, 10), new Set(), 15)
    expect(picked).toHaveLength(10)
    expect(new Set(idsOf(picked)).size).toBe(10)
  })

  it('varies which unseen questions are served', () => {
    const firsts = new Set()
    for (let i = 0; i < 50; i++) firsts.add(pickQuestions(bank, new Set(), 15)[0].id)
    expect(firsts.size).toBeGreaterThan(1)
  })
})
