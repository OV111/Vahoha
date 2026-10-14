import { describe, it, expect } from 'vitest'
import { buildScorecard } from '../../modules/recruiter/services/scorecardService.js'
import {
  SCORE_RULES,
  applyCandidateQuery,
  evidenceScore,
  toCandidateRow,
} from '../../modules/recruiter/services/candidateService.js'

const exam = (layer, score, path = 'api-dev') => ({
  path, layer, layerTitle: layer, score, passed: true, takenAt: new Date('2026-02-01'),
})
const cert = (id = 'api-dev') => ({
  track: { id, title: id }, verifyPath: `/verify/${id}`, scores: { review: 90 }, issuedAt: new Date(), revoked: false, testData: false,
})
const all = { exams: true, capstone: true, teams: true, strengths: true }

const card = ({ username = 'vahe', exams = [], certificates = [], teams = [], mastery = [], show = all, openToWork = false, lastActiveAt = new Date('2026-10-01') } = {}) =>
  buildScorecard({
    user: { username, firstName: username, lastName: '' },
    settings: { show, openToWork },
    progress: { xpTotal: 9999, createdAt: new Date('2026-01-01'), lastActiveAt },
    exams, certificates, teams, mastery,
  })

describe('evidenceScore', () => {
  it('is 0 with nothing shared', () => {
    expect(evidenceScore({ exams: null, capstones: null, teams: null }).score).toBe(0)
    expect(evidenceScore({ exams: [], capstones: [], teams: [] }).score).toBe(0)
  })

  it('adds layers, exam quality, capstone and team points, and tops out at 100', () => {
    const full = evidenceScore({
      exams: Array.from({ length: 12 }, (_, i) => ({ bestScore: 100, layer: i })), // 12 layers, capped at 8
      capstones: [{}, {}, {}],
      teams: [{}, {}, {}, {}],
    })
    expect(full.parts).toEqual({ layers: 40, quality: 20, capstone: 25, teams: 15 })
    expect(full.score).toBe(100)
  })

  it('scores exam quality from the average best score', () => {
    const { parts } = evidenceScore({ exams: [{ bestScore: 80 }, { bestScore: 60 }], capstones: [], teams: [] })
    expect(parts.layers).toBe(2 * SCORE_RULES.layers.perLayer)
    expect(parts.quality).toBe(14) // avg 70 -> 70% of 20
  })

  it('counts one capstone as 20 and two or more as 25', () => {
    expect(evidenceScore({ exams: [], capstones: [{}], teams: [] }).parts.capstone).toBe(20)
    expect(evidenceScore({ exams: [], capstones: [{}, {}], teams: [] }).parts.capstone).toBe(25)
  })

  it('never uses XP', () => {
    const rich = toCandidateRow(card({ exams: [exam('l1', 80)] }))
    expect(JSON.stringify(rich.evidence)).not.toContain('9999')
  })
})

describe('toCandidateRow', () => {
  it('turns shared sections into counts and a score', () => {
    const row = toCandidateRow(card({ exams: [exam('l1', 80), exam('l2', 90)], certificates: [cert()], teams: [{ name: 'T' }] }))
    expect(row).toMatchObject({ layersPassed: 2, avgExamScore: 85, capstones: 1, teamProjects: 1, tracks: ['api-dev'] })
    expect(row.evidence.score).toBeGreaterThan(0)
  })

  it('keeps a section the developer hid as null and out of the score', () => {
    const row = toCandidateRow(
      card({ exams: [exam('l1', 100)], certificates: [cert()], show: { ...all, exams: false, capstone: false, strengths: false } }),
    )
    expect(row).toMatchObject({ layersPassed: null, avgExamScore: null, capstones: null, strengths: null, tracks: [] })
    expect(row.evidence.score).toBe(0)
  })

  it('shows only solid topics as strengths, never weak ones', () => {
    const row = toCandidateRow(card({ mastery: [{ title: 'Caching', status: 'solid' }, { title: 'Races', status: 'shaky' }] }))
    expect(row.strengths).toEqual(['Caching'])
  })

  it('has no field that exposes XP or the raw scorecard sections', () => {
    const row = toCandidateRow(card({ exams: [exam('l1', 80)] }))
    expect(Object.keys(row).sort()).toEqual([
      'avgExamScore', 'capstones', 'evidence', 'headline', 'lastActiveAt', 'layersPassed',
      'name', 'openToWork', 'strengths', 'teamProjects', 'tracks', 'username',
    ])
  })
})

describe('applyCandidateQuery', () => {
  const rows = [
    toCandidateRow(card({ username: 'ana', exams: [exam('a', 90), exam('b', 90), exam('c', 90)], certificates: [cert('api-dev')], openToWork: true, lastActiveAt: new Date('2026-09-01') })),
    toCandidateRow(card({ username: 'ben', exams: [exam('a', 70, 'fullstack')], openToWork: false, lastActiveAt: new Date('2026-10-10') })),
    toCandidateRow(card({ username: 'cy', exams: [], lastActiveAt: new Date('2026-10-05') })),
  ]
  const names = (r) => r.items.map((i) => i.username)

  it('sorts by evidence score by default', () => {
    expect(names(applyCandidateQuery(rows, {}))).toEqual(['ana', 'ben', 'cy'])
  })

  it('sorts by last active', () => {
    expect(names(applyCandidateQuery(rows, { sort: 'active' }))).toEqual(['ben', 'cy', 'ana'])
  })

  it('filters by track, open to work, minimum layers and capstone', () => {
    expect(names(applyCandidateQuery(rows, { track: 'fullstack' }))).toEqual(['ben'])
    expect(names(applyCandidateQuery(rows, { openToWork: true }))).toEqual(['ana'])
    expect(names(applyCandidateQuery(rows, { minLayers: 2 }))).toEqual(['ana'])
    expect(names(applyCandidateQuery(rows, { hasCapstone: true }))).toEqual(['ana'])
  })

  it('searches name and username, case-insensitively', () => {
    expect(names(applyCandidateQuery(rows, { q: 'BE' }))).toEqual(['ben'])
  })

  it('pages the result and clamps an out-of-range page', () => {
    const p1 = applyCandidateQuery(rows, { limit: 2, page: 1 })
    expect(p1).toMatchObject({ total: 3, pages: 2, page: 1 })
    expect(names(p1)).toHaveLength(2)
    expect(applyCandidateQuery(rows, { limit: 2, page: 9 }).page).toBe(2)
  })

  it('breaks score ties by username so the order never flips', () => {
    const twins = [
      toCandidateRow(card({ username: 'zed', exams: [exam('a', 80)] })),
      toCandidateRow(card({ username: 'amy', exams: [exam('a', 80)] })),
    ]
    expect(names(applyCandidateQuery(twins, {}))).toEqual(['amy', 'zed'])
  })
})
