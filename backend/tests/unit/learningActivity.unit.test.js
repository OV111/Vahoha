import { describe, it, expect } from 'vitest'
import {
  dayKey,
  previousDay,
  currentStreak,
  streakFromDays,
  validTimeZone,
} from '../../services/learningActivity.js'

describe('dayKey', () => {
  const lateEveningLA = new Date('2026-11-02T05:30:00Z') // 21:30 on Nov 1 in Los Angeles

  it('uses the learner timezone, not UTC', () => {
    expect(dayKey(lateEveningLA, 'UTC')).toBe('2026-11-02')
    expect(dayKey(lateEveningLA, 'America/Los_Angeles')).toBe('2026-11-01')
  })

  it('falls back to UTC for a missing or invalid timezone', () => {
    expect(validTimeZone(undefined)).toBe('UTC')
    expect(validTimeZone('Not/AZone')).toBe('UTC')
    expect(dayKey(lateEveningLA, 'Not/AZone')).toBe('2026-11-02')
  })
})

describe('previousDay', () => {
  it('crosses month and year boundaries', () => {
    expect(previousDay('2026-03-01')).toBe('2026-02-28')
    expect(previousDay('2027-01-01')).toBe('2026-12-31')
  })
})

describe('currentStreak', () => {
  const now = new Date('2026-11-01T12:00:00Z')
  const progress = (lastLearningDay, streak = 4) => ({ streak, lastLearningDay, streakTimeZone: 'UTC' })

  it('keeps the streak through today and yesterday', () => {
    expect(currentStreak(progress('2026-11-01'), now)).toBe(4)
    expect(currentStreak(progress('2026-10-31'), now)).toBe(4)
  })

  it('is 0 once a whole day was missed, whatever is stored', () => {
    expect(currentStreak(progress('2026-10-30'), now)).toBe(0)
  })

  it('is 0 for a learner who never learned', () => {
    expect(currentStreak(null, now)).toBe(0)
    expect(currentStreak({ streak: 0 }, now)).toBe(0)
  })
})

describe('streakFromDays', () => {
  it('counts the run ending on the latest day, ignoring duplicates and order', () => {
    expect(
      streakFromDays(['2026-10-30', '2026-10-28', '2026-10-31', '2026-10-31', '2026-10-29', '2026-10-25']),
    ).toEqual({ streak: 4, lastLearningDay: '2026-10-31' })
  })

  it('is 1 when the latest day stands alone', () => {
    expect(streakFromDays(['2026-10-31', '2026-10-29'])).toEqual({ streak: 1, lastLearningDay: '2026-10-31' })
  })

  it('is empty for no days', () => {
    expect(streakFromDays([])).toEqual({ streak: 0, lastLearningDay: null })
  })
})
