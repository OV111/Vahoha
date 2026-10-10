import { describe, it, expect } from 'vitest'
import { ObjectId } from 'mongodb'
import { buildEvidence, buildReadinessView } from '../../modules/readiness/lib/readinessView.js'
import { countContributions } from '../../modules/teams/services/memberStatsService.js'
import { summarizeLearnerContext } from '../../services/agent/learnerContextService.js'

const noCapstone = { capstonePassed: false, defensesPassed: 0 }
const noTeams = { teamCount: 0, mergedPrs: 0, reviewsGiven: 0, defensesPassed: 0, peerAverage: null }

describe('buildEvidence', () => {
  it('adds capstone and team defenses together', () => {
    const e = buildEvidence({ capstonePassed: true, defensesPassed: 1 }, { ...noTeams, defensesPassed: 2 })
    expect(e.defensesPassed).toBe(3)
    expect(e.capstonePassed).toBe(true)
  })

  it('leaves Debug & Ops inputs at zero until they have a source', () => {
    const e = buildEvidence(noCapstone, noTeams)
    expect([e.deploys, e.incidentsFixed, e.debugTasksPassed]).toEqual([0, 0, 0])
  })
})

describe('buildReadinessView', () => {
  it('a brand-new learner is entry with every sphere at none', () => {
    const view = buildReadinessView(buildEvidence(noCapstone, noTeams))
    expect(view.overall).toBe('entry')
    expect(view.spheres.every((s) => s.level === 'none')).toBe(true)
  })

  it('returns every sphere in model order with its title and skills', () => {
    const view = buildReadinessView(buildEvidence(noCapstone, noTeams))
    expect(view.spheres.map((s) => s.id)).toEqual(['build', 'judgment', 'collaboration', 'debugOps', 'ownership'])
    expect(view.spheres.find((s) => s.id === 'ownership').derived).toBe(true)
    expect(view.spheres[0].skills.length).toBeGreaterThan(0)
  })

  it('a passed capstone alone shows Build and Judgment', () => {
    const view = buildReadinessView(buildEvidence({ capstonePassed: true, defensesPassed: 1 }, noTeams))
    const level = (id) => view.spheres.find((s) => s.id === id).level
    expect(level('build')).toBe('shown')
    expect(level('judgment')).toBe('shown')
    expect(view.evidence.capstonePassed).toBe(true)
  })
})

describe('countContributions', () => {
  const me = new ObjectId()
  const other = new ObjectId()

  it('counts my merged PRs and reviews, matching logins case-insensitively', () => {
    const rows = [
      { authorId: me, reviewers: ['bob'] },
      { authorId: me, reviewers: [] },
      { authorId: other, reviewers: ['Vahe'] },
      { authorId: other, reviewers: ['bob'] },
    ]
    expect(countContributions(rows, me, ['vahe'])).toEqual({ mergedPrs: 2, reviewsGiven: 1 })
  })

  it('is zero with no contributions', () => {
    expect(countContributions([], me, ['vahe'])).toEqual({ mergedPrs: 0, reviewsGiven: 0 })
  })
})

describe('summarizeLearnerContext — teams line', () => {
  const ctx = {
    profile: { activePath: 'backend', currentLayer: 2, skillLevel: 'beginner', streak: 1 },
    exams: { lastScore: null },
    topics: [],
    challenges: { attemptedCount: 0 },
    nextAction: null,
    teachingAttempts: [],
  }

  it('mentions team work only for learners on a team', () => {
    expect(summarizeLearnerContext({ ...ctx, teams: { teamCount: 0 } })).not.toContain('Build Team')
    const line = summarizeLearnerContext({
      ...ctx,
      teams: { teamCount: 1, mergedPrs: 3, reviewsGiven: 2, defensesPassed: 0 },
    })
    expect(line).toContain('Build Team: 3 merged PR(s), 2 review(s) given, team defense not passed yet')
  })

  it('still works for a context built before teams existed', () => {
    expect(() => summarizeLearnerContext(ctx)).not.toThrow()
  })
})
