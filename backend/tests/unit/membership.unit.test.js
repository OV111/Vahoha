import { describe, it, expect } from 'vitest'
import {
  beginRefusal,
  canManageSetup,
  eligibilityRefusal,
  joinRefusal,
  leaveRefusal,
  repoOwnerRefusal,
} from '../../modules/teams/lib/membership.js'

const m = (userId, githubLogin = userId, status = 'active') => ({ userId, githubLogin, status })
const team = (extra = {}) => ({ status: 'forming', createdBy: 'c', leadId: 'ai', coLeadId: null, repo: null, members: [m('c', 'Creator')], ...extra })

describe('eligibilityRefusal', () => {
  const ok = { passedTracks: [{ trackId: 'api-dev' }], githubLogin: 'ada', runningTeams: 0 }
  it('lets in someone with a capstone, GitHub and no team', () => {
    expect(eligibilityRefusal(ok)).toBeNull()
  })
  it('asks for a capstone, then GitHub', () => {
    expect(eligibilityRefusal({ ...ok, passedTracks: [] })).toMatch(/capstone/)
    expect(eligibilityRefusal({ ...ok, githubLogin: null })).toMatch(/GitHub/)
  })
  it('has no team limit by default, and enforces one when set', () => {
    expect(eligibilityRefusal({ ...ok, runningTeams: 25 })).toBeNull()
    expect(eligibilityRefusal({ ...ok, runningTeams: 2 }, 3)).toBeNull()
    expect(eligibilityRefusal({ ...ok, runningTeams: 3 }, 3)).toMatch(/3 running teams/)
    expect(eligibilityRefusal({ ...ok, runningTeams: 1 }, 1)).toMatch(/1 running team,/)
  })
})

describe('canManageSetup', () => {
  it('is the creator, the human lead or the co-lead', () => {
    expect(canManageSetup(team(), 'c')).toBe(true)
    expect(canManageSetup(team({ createdBy: null, leadId: 'l' }), 'l')).toBe(true)
    expect(canManageSetup(team({ coLeadId: 'co' }), 'co')).toBe(true)
    expect(canManageSetup(team(), 'someone')).toBe(false)
  })
})

describe('joinRefusal', () => {
  it('lets people join a forming team with room', () => {
    expect(joinRefusal(team())).toBeNull()
  })
  it('closes a started team and a full one, counting only active members', () => {
    expect(joinRefusal(team({ status: 'active' }))).toMatch(/started/)
    const six = Array.from({ length: 6 }, (_, i) => m(`u${i}`))
    expect(joinRefusal(team({ members: six }))).toMatch(/full/)
    expect(joinRefusal(team({ members: [...six.slice(0, 5), m('gone', 'gone', 'left')] }))).toBeNull()
  })
})

describe('beginRefusal', () => {
  it('needs two members and a repo', () => {
    expect(beginRefusal(team({ repo: { fullName: 'c/p' } }))).toMatch(/at least 2/)
    expect(beginRefusal(team({ members: [m('c'), m('d')] }))).toMatch(/repository/)
    expect(beginRefusal(team({ members: [m('c'), m('d')], repo: { fullName: 'c/p' } }))).toBeNull()
    expect(beginRefusal(team({ status: 'active' }))).toMatch(/already started/)
  })
})

describe('leaveRefusal', () => {
  it('lets a member leave a running team only', () => {
    expect(leaveRefusal(team(), 'c')).toBeNull()
    expect(leaveRefusal(team(), 'stranger')).toMatch(/aren't on/)
    expect(leaveRefusal(team({ status: 'completed' }), 'c')).toMatch(/finished/)
  })
})

describe('repoOwnerRefusal', () => {
  it('accepts a repo owned by a member, case-insensitively, and nobody else', () => {
    expect(repoOwnerRefusal(team(), 'creator')).toBeNull()
    expect(repoOwnerRefusal(team(), 'someone-else')).toMatch(/team member/)
  })
})
