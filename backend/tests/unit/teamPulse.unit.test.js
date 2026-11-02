import { describe, it, expect } from 'vitest'
import { buildWeeklyFacts, computeHealth, computeWarnings, weekStartOf } from '../../modules/teams/lib/teamPulse.js'

const DAY = 86_400_000
const now = new Date('2026-11-12T12:00:00Z')
const ago = (days) => new Date(now - days * DAY)

const members = [
  { userId: 'a', login: 'ada', level: 'mid', joinedAt: ago(30) },
  { userId: 'j', login: 'jon', level: 'junior', joinedAt: ago(30) },
]
const active = new Map([['a', ago(1)], ['j', ago(1)]])
const base = { now, prefix: 'TA', members, tasks: [], inReviewSince: new Map(), contributions: [], lastActive: active, sprint: null }
const task = (key, extra = {}) => ({ _id: `t${key}`, key, title: `Task ${key}`, status: 'backlog', assigneeId: null, size: 'M', dueAt: null, sprintId: null, ...extra })
const types = (ws) => ws.map((w) => w.type)

describe('computeWarnings', () => {
  it('is quiet for a healthy team', () => {
    expect(computeWarnings(base)).toEqual([])
  })

  it('flags a PR waiting 3+ days for review, not one waiting 2', () => {
    const t = task(4, { status: 'in_review' })
    expect(types(computeWarnings({ ...base, tasks: [t], inReviewSince: new Map([['t4', ago(3)]]) })) ).toEqual(['review_waiting'])
    expect(computeWarnings({ ...base, tasks: [t], inReviewSince: new Map([['t4', ago(2)]]) })).toEqual([])
  })

  it('flags overdue tasks but never done ones', () => {
    const ws = computeWarnings({ ...base, tasks: [task(1, { dueAt: ago(2) }), task(2, { dueAt: ago(2), status: 'done' })] })
    expect(ws.map((w) => w.subjectKey)).toEqual(['task:1'])
    expect(ws[0].message).toMatch(/TA-1 is 2 days past/)
  })

  it('flags an L task on a junior to the lead, with a kinder note for the junior', () => {
    const [w] = computeWarnings({ ...base, tasks: [task(9, { size: 'L', assigneeId: 'j' })] })
    expect(w).toMatchObject({ type: 'task_too_big', audience: 'lead', subjectUserId: 'j' })
    expect(w.selfMessage).not.toMatch(/newer/)
  })

  it('does not flag an L task on a mid', () => {
    expect(computeWarnings({ ...base, tasks: [task(9, { size: 'L', assigneeId: 'a' })] })).toEqual([])
  })

  it('flags merges without review in the last two weeks only', () => {
    const contributions = [
      { prNumber: 1, authorId: 'a', reviewers: [], mergedAt: ago(3) },
      { prNumber: 2, authorId: 'a', reviewers: [], mergedAt: ago(20) },
      { prNumber: 3, authorId: 'j', reviewers: ['ada'], mergedAt: ago(1) },
    ]
    expect(computeWarnings({ ...base, contributions }).map((w) => w.subjectKey)).toEqual(['pr:1'])
  })

  it('flags one member writing 80%+ of 5+ recent merged PRs', () => {
    const pr = (n, authorId) => ({ prNumber: n, authorId, reviewers: ['x'], mergedAt: ago(1) })
    const skewed = [pr(1, 'a'), pr(2, 'a'), pr(3, 'a'), pr(4, 'a'), pr(5, 'j')]
    const [w] = computeWarnings({ ...base, contributions: skewed })
    expect(w).toMatchObject({ type: 'workload_skew', subjectUserId: 'a', audience: 'lead' })
    expect(computeWarnings({ ...base, contributions: skewed.slice(0, 4) })).toEqual([]) // under 5 PRs: too few to judge
  })

  it('flags a member quiet for 5+ days, but not someone who just joined', () => {
    const quiet = new Map([['a', ago(1)], ['j', ago(6)]])
    expect(computeWarnings({ ...base, lastActive: quiet }).map((w) => w.subjectKey)).toEqual(['user:j'])
    const newcomer = [members[0], { ...members[1], joinedAt: ago(2) }]
    expect(computeWarnings({ ...base, members: newcomer, lastActive: new Map([['a', ago(1)]]) })).toEqual([])
  })

  it('flags a sprint behind pace, and one past its end', () => {
    const sprint = { _id: 's1', name: 'Sprint 1', startAt: ago(8), endAt: new Date(now.getTime() + 2 * DAY) }
    const tasks = [task(1, { sprintId: 's1' }), task(2, { sprintId: 's1' }), task(3, { sprintId: 's1' }), task(4, { sprintId: 's1', status: 'done' })]
    expect(types(computeWarnings({ ...base, sprint, tasks }))).toEqual(['sprint_behind'])
    const onPace = tasks.map((t, i) => (i < 3 ? { ...t, status: 'done' } : t))
    expect(computeWarnings({ ...base, sprint, tasks: onPace })).toEqual([])
    const ended = { ...sprint, endAt: ago(2) }
    expect(computeWarnings({ ...base, sprint: ended, tasks: onPace })[0].message).toMatch(/ended 2 days ago/)
  })
})

describe('computeHealth', () => {
  it('is green with no warnings and a recent merge', () => {
    expect(computeHealth({ openWarnings: [], lastMergeAt: ago(2), startedAt: ago(20), now })).toBe('green')
  })
  it('is yellow with a fresh warning', () => {
    expect(computeHealth({ openWarnings: [{ openedAt: ago(1) }], lastMergeAt: ago(2), startedAt: ago(20), now })).toBe('yellow')
  })
  it('is red when a warning is older than 3 days, or nothing merged in 7', () => {
    expect(computeHealth({ openWarnings: [{ openedAt: ago(4) }], lastMergeAt: ago(2), startedAt: ago(20), now })).toBe('red')
    expect(computeHealth({ openWarnings: [], lastMergeAt: ago(8), startedAt: ago(20), now })).toBe('red')
    expect(computeHealth({ openWarnings: [], lastMergeAt: null, startedAt: ago(8), now })).toBe('red')
  })
  it('does not go red for a team that has not started', () => {
    expect(computeHealth({ openWarnings: [], lastMergeAt: null, startedAt: null, now })).toBe('green')
  })
})

describe('weekStartOf', () => {
  it('is Monday 00:00 UTC', () => {
    expect(weekStartOf(new Date('2026-11-12T12:00:00Z')).toISOString()).toBe('2026-11-09T00:00:00.000Z') // a Thursday
    expect(weekStartOf(new Date('2026-11-09T00:00:00Z')).toISOString()).toBe('2026-11-09T00:00:00.000Z') // Monday itself
    expect(weekStartOf(new Date('2026-11-15T23:59:00Z')).toISOString()).toBe('2026-11-09T00:00:00.000Z') // Sunday
  })
})

describe('buildWeeklyFacts', () => {
  it('counts only what happened inside the week', () => {
    const from = ago(7)
    const to = now
    const tasks = [
      task(1, { status: 'done', doneAt: ago(2) }),
      task(2, { status: 'done', doneAt: ago(10) }),
      task(3, { status: 'in_review' }),
    ]
    const events = [
      { type: 'moved', to: 'in_progress', taskId: 't3', at: ago(3) },
      { type: 'moved', to: 'in_progress', taskId: 't3', at: ago(2) },
      { type: 'created', taskId: 't3', at: ago(9) },
    ]
    const contributions = [{ mergedAt: ago(2), reviewers: ['x'] }, { mergedAt: ago(1), reviewers: [] }]
    const warnings = [{ type: 'review_waiting', subjectKey: 'task:3', audience: 'team', message: 'TA-3 has waited' }]
    const f = buildWeeklyFacts({ prefix: 'TA', tasks, events, contributions, warnings, from, to })
    expect(f.shipped).toEqual([{ ref: 'TA-1', title: 'Task 1' }])
    expect(f.started).toBe(1)
    expect(f.created).toBe(0)
    expect(f).toMatchObject({ mergedPrs: 2, reviewedPrs: 1, blocked: ['TA-3'], stillOpen: 1 })
  })
})
