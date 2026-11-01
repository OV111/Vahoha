import { describe, it, expect, beforeAll } from 'vitest'
import process from 'node:process'
import { dueWeekKey } from '../../modules/email/lib/schedule.js'
import { summaryKind, weekStats, QUIET_DAYS } from '../../modules/email/lib/summary.js'
import { createUnsubscribeToken, verifyUnsubscribeToken } from '../../modules/email/lib/unsubscribeToken.js'
import { renderWeeklySummaryEmail } from '../../modules/email/lib/weeklySummaryEmail.js'
import { nextStepFor } from '../../modules/email/services/weeklySummaryService.js'

// 2026-11-01 is a Sunday.
describe('dueWeekKey', () => {
  it('is due from 18:00 local on Sunday, keyed by that Sunday', () => {
    expect(dueWeekKey(new Date('2026-11-01T18:10:00Z'), 'UTC')).toBe('2026-11-01')
    expect(dueWeekKey(new Date('2026-11-01T23:59:00Z'), 'UTC')).toBe('2026-11-01')
  })

  it('is not due before 18:00 or on another day', () => {
    expect(dueWeekKey(new Date('2026-11-01T17:59:00Z'), 'UTC')).toBeNull()
    expect(dueWeekKey(new Date('2026-11-02T00:10:00Z'), 'UTC')).toBeNull()
  })

  it('follows the learner timezone, even when it is Monday in UTC', () => {
    // 18:10 on Sunday in Los Angeles is 02:10 Monday UTC
    expect(dueWeekKey(new Date('2026-11-02T02:10:00Z'), 'America/Los_Angeles')).toBe('2026-11-01')
    // 18:10 UTC on Sunday is already Monday in Tokyo
    expect(dueWeekKey(new Date('2026-11-01T18:10:00Z'), 'Asia/Tokyo')).toBeNull()
  })
})

describe('summaryKind', () => {
  const now = new Date('2026-11-01T18:00:00Z')
  const daysAgo = (n) => new Date(now.getTime() - n * 86_400_000)
  const quiet = {
    now,
    signedUpAt: daysAgo(100),
    lastLearnedAt: null,
    activeDays: 0,
    layersPassed: [],
    challengesSolved: 0,
    xpEarned: 0,
  }

  it('is "week" when anything happened this week', () => {
    expect(summaryKind({ ...quiet, activeDays: 1 })).toBe('week')
    expect(summaryKind({ ...quiet, layersPassed: ['HTTP'] })).toBe('week')
  })

  it('nudges a recently active learner after a quiet week', () => {
    expect(summaryKind({ ...quiet, lastLearnedAt: daysAgo(10) })).toBe('nudge')
  })

  it('nudges a new signup who has not started', () => {
    expect(summaryKind({ ...quiet, signedUpAt: daysAgo(3) })).toBe('nudge')
  })

  it(`stops after ${QUIET_DAYS} quiet days`, () => {
    expect(summaryKind({ ...quiet, lastLearnedAt: daysAgo(QUIET_DAYS + 1) })).toBeNull()
    expect(summaryKind(quiet)).toBeNull()
  })
})

describe('weekStats', () => {
  it('leaves out zeros and pluralises', () => {
    expect(weekStats({ streak: 3, activeDays: 1, layersPassed: [], challengesSolved: 2, xpEarned: 0 })).toEqual([
      { label: 'day streak', value: 3 },
      { label: 'day learning', value: 1 },
      { label: 'challenges solved', value: 2 },
    ])
  })
})

describe('unsubscribe token', () => {
  beforeAll(() => {
    process.env.JWT_Secret ??= 'test-secret'
  })
  const id = '64b7f0c2a1b2c3d4e5f60718'

  it('round-trips a user id', () => {
    expect(verifyUnsubscribeToken(createUnsubscribeToken(id))).toBe(id)
  })

  it('rejects a forged or swapped token', () => {
    const [, sig] = createUnsubscribeToken(id).split('.')
    expect(verifyUnsubscribeToken(`64b7f0c2a1b2c3d4e5f60719.${sig}`)).toBeNull()
    expect(verifyUnsubscribeToken(`${id}.nope`)).toBeNull()
    expect(verifyUnsubscribeToken('garbage')).toBeNull()
    expect(verifyUnsubscribeToken(undefined)).toBeNull()
  })
})

describe('nextStepFor', () => {
  const site = 'https://vahoha.com'

  it('sends weak topics to the mentor and progress to the roadmap', () => {
    expect(nextStepFor({ action: 'reinforce', title: 'JWT' }, null, site).url).toBe(`${site}/ai-agent`)
    expect(nextStepFor({ action: 'advance' }, 'REST APIs', site)).toMatchObject({
      url: `${site}/roadmaps`,
      text: expect.stringContaining('REST APIs'),
    })
    expect(nextStepFor({ action: 'start' }, null, site).url).toBe(`${site}/roadmaps`)
  })
})

describe('renderWeeklySummaryEmail', () => {
  const base = {
    kind: 'week',
    firstName: '<b>Ada</b>',
    stats: [{ label: 'day streak', value: 4 }],
    layersPassed: ['HTTP & REST'],
    nextStep: { text: 'Practice JWT', ctaLabel: 'Go', url: 'https://vahoha.com/ai-agent?a=1&b=2' },
    unsubscribeUrl: 'https://vahoha.com/unsubscribe?token=x',
  }

  it('escapes user content and puts the streak in the subject', () => {
    const { subject, html, text } = renderWeeklySummaryEmail(base)
    expect(subject).toContain('4-day streak')
    expect(html).not.toContain('<b>Ada</b>')
    expect(html).toContain('&lt;b&gt;Ada&lt;/b&gt;')
    expect(html).toContain('HTTP &amp; REST')
    expect(text).toContain('https://vahoha.com/unsubscribe?token=x')
  })

  it('uses the nudge copy for a quiet week', () => {
    expect(renderWeeklySummaryEmail({ ...base, kind: 'nudge', stats: [] }).subject).toBe('Pick up where you left off')
  })
})
