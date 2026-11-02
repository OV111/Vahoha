import { describe, it, expect } from 'vitest'
import { computeTeamLevel, pickLeads } from '../../modules/teams/lib/teamLevel.js'

const junior = { capstonePassed: true, readinessOverall: 'entry', judgment: 'shown', finishedTeams: 0, defensesPassed: 1, peerAverage: null, cv: null }
const mid = { ...junior, readinessOverall: 'approaching-mid' }
const lead = { ...mid, judgment: 'strong', finishedTeams: 1, defensesPassed: 3, peerAverage: 4.2 }
const confirmedMidCv = { level: 'mid', confirmedAt: new Date('2026-11-01') }

describe('computeTeamLevel', () => {
  it('is starter without a passed capstone, whatever else is true', () => {
    expect(computeTeamLevel({ ...lead, capstonePassed: false })).toEqual({ level: 'starter', provisional: false, next: ['capstone'] })
  })

  it('is junior with a capstone and entry readiness', () => {
    expect(computeTeamLevel(junior)).toEqual({ level: 'junior', provisional: false, next: ['readiness'] })
  })

  it('is mid from readiness evidence and lists what lead needs', () => {
    const r = computeTeamLevel(mid)
    expect(r.level).toBe('mid')
    expect(r.provisional).toBe(false)
    expect(r.next).toEqual(['finishedTeam', 'peerRating', 'judgment'])
  })

  it('is lead-eligible only when every lead rule holds', () => {
    expect(computeTeamLevel(lead)).toEqual({ level: 'lead-eligible', provisional: false, next: [] })
    expect(computeTeamLevel({ ...lead, peerAverage: 3.9 }).level).toBe('mid')
    expect(computeTeamLevel({ ...lead, peerAverage: null }).level).toBe('mid')
    expect(computeTeamLevel({ ...lead, finishedTeams: 0 }).level).toBe('mid')
    expect(computeTeamLevel({ ...lead, judgment: 'shown' }).level).toBe('mid')
  })

  it('needs mid readiness for lead even with every other rule met', () => {
    expect(computeTeamLevel({ ...lead, readinessOverall: 'entry' }).level).toBe('junior')
  })

  it('lets a confirmed CV lift a junior to provisional mid', () => {
    expect(computeTeamLevel({ ...junior, cv: confirmedMidCv })).toMatchObject({ level: 'mid', provisional: true })
  })

  it('ignores a CV the user has not confirmed', () => {
    expect(computeTeamLevel({ ...junior, cv: { level: 'mid', confirmedAt: null } }).level).toBe('junior')
  })

  it('never makes anyone lead-eligible from a CV', () => {
    expect(computeTeamLevel({ ...junior, cv: { level: 'lead-eligible', confirmedAt: new Date() } }).level).toBe('junior')
  })

  it('stops counting the CV once platform evidence exists', () => {
    expect(computeTeamLevel({ ...junior, cv: confirmedMidCv, finishedTeams: 1 }).level).toBe('junior')
    expect(computeTeamLevel({ ...junior, cv: confirmedMidCv, defensesPassed: 2 }).level).toBe('junior')
  })

  it('does not mark an evidence-based mid as provisional when a CV also exists', () => {
    expect(computeTeamLevel({ ...mid, cv: confirmedMidCv }).provisional).toBe(false)
  })
})

const member = (userId, level, extra = {}) => ({
  userId,
  level,
  provisional: false,
  peerAverage: null,
  mergedPrs: 0,
  joinedAt: new Date('2026-11-01'),
  ...extra,
})

describe('pickLeads', () => {
  it('gives the lead to a lead-eligible member, with no co-lead', () => {
    expect(pickLeads([member('a', 'junior'), member('b', 'lead-eligible'), member('c', 'mid')])).toEqual({ leadId: 'b', coLeadId: null })
  })

  it('lets the AI lead when nobody is lead-eligible, with the best mid as co-lead', () => {
    expect(pickLeads([member('a', 'junior'), member('c', 'mid')])).toEqual({ leadId: 'ai', coLeadId: 'c' })
  })

  it('has no co-lead when the AI leads a team of juniors', () => {
    expect(pickLeads([member('a', 'junior'), member('b', 'starter')])).toEqual({ leadId: 'ai', coLeadId: null })
  })

  it('handles an empty team', () => {
    expect(pickLeads([])).toEqual({ leadId: 'ai', coLeadId: null })
  })

  it('prefers evidence over a CV-only mid for co-lead', () => {
    const r = pickLeads([member('cv', 'mid', { provisional: true, peerAverage: 5 }), member('ev', 'mid')])
    expect(r.coLeadId).toBe('ev')
  })

  it('breaks ties by peer rating, then merged PRs, then who joined first', () => {
    expect(pickLeads([member('a', 'lead-eligible', { peerAverage: 4.1 }), member('b', 'lead-eligible', { peerAverage: 4.6 })]).leadId).toBe('b')
    expect(pickLeads([member('a', 'lead-eligible', { mergedPrs: 2 }), member('b', 'lead-eligible', { mergedPrs: 7 })]).leadId).toBe('b')
    expect(
      pickLeads([
        member('late', 'lead-eligible', { joinedAt: new Date('2026-11-05') }),
        member('early', 'lead-eligible', { joinedAt: new Date('2026-11-02') }),
      ]).leadId,
    ).toBe('early')
  })

  it('gives the same answer whatever order members come in', () => {
    const ms = [member('x', 'mid'), member('y', 'mid'), member('z', 'junior')]
    expect(pickLeads(ms)).toEqual(pickLeads([...ms].reverse()))
  })
})
