import { describe, it, expect } from 'vitest'
import { extractTaskKeys, pickPullPerTask, planTaskUpdate } from '../../modules/teams/lib/prLinks.js'

const pr = (number, state, extra = {}) => ({
  number,
  state,
  title: `TA-1 change ${number}`,
  branch: '',
  url: `https://github.com/o/r/pull/${number}`,
  authorLogin: 'ada',
  mergedAt: state === 'merged' ? new Date('2026-11-02') : null,
  ...extra,
})

describe('extractTaskKeys', () => {
  it('finds keys in the title and the branch, case-insensitive, without duplicates', () => {
    expect(extractTaskKeys('TA', 'TA-12 login form', 'feature/ta-12-login').sort()).toEqual([12])
    expect(extractTaskKeys('TA', 'TA-3 and TA-4', 'ta-5').sort((a, b) => a - b)).toEqual([3, 4, 5])
  })
  it('does not match a longer prefix or a longer number', () => {
    expect(extractTaskKeys('TA', 'XTA-1 fix', '')).toEqual([])
    expect(extractTaskKeys('TA', 'data-2 migration', '')).toEqual([])
    expect(extractTaskKeys('TA', '', 'ta-12x')).toEqual([12])
  })
  it('matches inside brackets and after a slash', () => {
    expect(extractTaskKeys('TA', '[TA-7] tidy', '')).toEqual([7])
    expect(extractTaskKeys('TA', '', 'fix/TA-8')).toEqual([8])
  })
  it('returns nothing without a prefix', () => {
    expect(extractTaskKeys('', 'TA-1', '')).toEqual([])
  })
})

describe('pickPullPerTask', () => {
  it('ignores PRs from people who are not on the team', () => {
    expect(pickPullPerTask('TA', [pr(1, 'merged', { authorLogin: 'stranger' })], ['ada']).size).toBe(0)
  })
  it('matches member logins case-insensitively', () => {
    expect(pickPullPerTask('TA', [pr(1, 'open', { authorLogin: 'ADA' })], ['ada']).get(1).number).toBe(1)
  })
  it('lets a merged PR win over an open or closed one', () => {
    const picked = pickPullPerTask('TA', [pr(5, 'open'), pr(2, 'merged'), pr(9, 'closed')], ['ada'])
    expect(picked.get(1).number).toBe(2)
  })
  it('takes the newest PR when two have the same state', () => {
    expect(pickPullPerTask('TA', [pr(3, 'open'), pr(7, 'open')], ['ada']).get(1).number).toBe(7)
  })
})

describe('planTaskUpdate', () => {
  it('moves a task to In review when its PR opens', () => {
    expect(planTaskUpdate({ status: 'in_progress', pr: null }, pr(4, 'open'))).toMatchObject({ status: 'in_review', pr: { number: 4, state: 'open' } })
    expect(planTaskUpdate({ status: 'backlog', pr: null }, pr(4, 'open')).status).toBe('in_review')
  })
  it('finishes a task when its PR merges, with the merge time', () => {
    const change = planTaskUpdate({ status: 'in_review', pr: null }, pr(4, 'merged'))
    expect(change.status).toBe('done')
    expect(change.doneAt).toEqual(new Date('2026-11-02'))
  })
  it('sends a task back to In progress when its PR closes without merging', () => {
    expect(planTaskUpdate({ status: 'in_review', pr: null }, pr(4, 'closed')).status).toBe('in_progress')
  })
  it('keeps the column but records the link for a closed PR on a task that is not in review', () => {
    expect(planTaskUpdate({ status: 'backlog', pr: null }, pr(4, 'closed'))).toMatchObject({ status: 'backlog', pr: { state: 'closed' } })
  })
  it('never touches a done task', () => {
    expect(planTaskUpdate({ status: 'done', pr: { number: 4, state: 'merged' } }, pr(9, 'open'))).toBeNull()
  })
  it('does nothing when the card already matches the PR', () => {
    const p = pr(4, 'open')
    expect(planTaskUpdate({ status: 'in_review', pr: { number: 4, state: 'open', url: p.url } }, p)).toBeNull()
  })
})
