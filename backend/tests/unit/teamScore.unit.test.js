import { describe, it, expect } from 'vitest'
import { ObjectId } from 'mongodb'
import {
  balanceOf, bayesianPeer, computeTeamStats, scoreTeam, teamFlags, PR_TARGET,
} from '../../modules/teams/lib/teamScore.js'

const now = new Date('2026-10-12T12:00:00Z')
const daysAgo = (d) => new Date(now - d * 86_400_000)
const [a, b, c] = [new ObjectId(), new ObjectId(), new ObjectId()]
const team = {
  status: 'active',
  repo: { fullName: 'org/x' },
  members: [
    { userId: a, githubLogin: 'ann', status: 'active' },
    { userId: b, githubLogin: 'bob', status: 'active' },
    { userId: c, githubLogin: 'cy', status: 'left' },
  ],
}
const pr = (authorId, { reviewers = ['x'], mergedAt = daysAgo(1) } = {}) => ({ authorId, reviewers, mergedAt })
const stats = (prs, defense = new Map(), peers = new Map()) => computeTeamStats(team, prs, defense, peers, now)

describe('balanceOf', () => {
  it('is 1 when everyone shipped the same, 0 when one person did everything', () => {
    expect(balanceOf([3, 3, 3])).toBe(1)
    expect(balanceOf([6, 0, 0])).toBe(0)
  })
  it('is 0 for a one-person team or no PRs', () => {
    expect(balanceOf([5])).toBe(0)
    expect(balanceOf([0, 0])).toBe(0)
  })
})

describe('bayesianPeer', () => {
  it('pulls a single perfect average toward 3, below many 4.5s', () => {
    expect(bayesianPeer([5])).toBeLessThan(bayesianPeer([4.5, 4.5, 4.5, 4.5, 4.5]))
  })
  it('is null with no qualifying ratings', () => {
    expect(bayesianPeer([])).toBeNull()
  })
})

describe('computeTeamStats', () => {
  it('counts only active members, finds silent ones and the last merge', () => {
    const s = stats([pr(a), pr(a, { reviewers: [], mergedAt: daysAgo(10) }), pr(c)])
    expect(s.memberCount).toBe(2)
    expect(s.mergedPrs).toBe(3) // a PR by someone who left still counts for the team
    expect(s.prsLast7d).toBe(2)
    expect(s.reviewedShare).toBeCloseTo(2 / 3)
    expect(s.silentMembers).toEqual(['bob'])
    expect(s.lastMergedAt).toEqual(daysAgo(1))
  })

  it('averages defense over all active members for the score, over passers for display', () => {
    const s = stats([], new Map([[a.toString(), 80]]))
    expect(s.defenseAvg).toBe(80)
    expect(s.defenseCoverage).toBeCloseTo(0.4)
  })
})

describe('scoreTeam', () => {
  it('caps output so PR-splitting cannot buy rank', () => {
    const many = Array.from({ length: PR_TARGET * 10 }, (_, i) => pr(i % 2 ? a : b))
    expect(scoreTeam(stats(many)).breakdown.output).toBe(1)
  })

  it('gives 100 to a team that maxes every signal', () => {
    const prs = Array.from({ length: PR_TARGET * 2 }, (_, i) => pr(i % 2 ? a : b))
    const def = new Map([[a.toString(), 100], [b.toString(), 100]])
    const s = { ...stats(prs, def), peerBayes: 5 }
    expect(scoreTeam(s).score).toBe(100)
  })

  it('scores 0 for a team with no merged PRs', () => {
    expect(scoreTeam(stats([])).score).toBe(0)
  })

  it('scores a team with no ratings at the neutral prior, not zero', () => {
    expect(scoreTeam(stats([pr(a)])).breakdown.peer).toBeCloseTo(0.6)
  })

  it('ranks an even team above a one-person team with the same PR count', () => {
    const even = scoreTeam(stats([pr(a), pr(a), pr(b), pr(b)])).score
    const solo = scoreTeam(stats([pr(a), pr(a), pr(a), pr(a)])).score
    expect(even).toBeGreaterThan(solo)
  })
})

describe('teamFlags', () => {
  it('flags stale, silent members and low peer ratings', () => {
    const s = stats([pr(a, { mergedAt: daysAgo(9) })], new Map(), new Map([[a.toString(), 2]]))
    expect(teamFlags(team, s, null, now)).toEqual(['stale', 'silent-members', 'low-peer'])
  })

  it('flags evidence published before the latest merge', () => {
    const s = stats([pr(a), pr(b)])
    expect(teamFlags(team, s, { revoked: false, issuedAt: daysAgo(3) }, now)).toEqual(['evidence-stale'])
    expect(teamFlags(team, s, { revoked: true, issuedAt: daysAgo(3) }, now)).toEqual([])
  })

  it('flags a missing repo and never flags closed teams', () => {
    expect(teamFlags({ ...team, repo: null }, stats([]), null, now)).toEqual(['no-repo'])
    expect(teamFlags({ ...team, status: 'completed', repo: null }, stats([]), null, now)).toEqual([])
  })
})
