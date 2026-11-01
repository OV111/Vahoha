import { describe, it, expect } from 'vitest'
import { buildWeek, buildPath } from '../../modules/mastery/services/journeyService.js'

describe('buildWeek', () => {
  const now = new Date('2026-11-01T12:00:00Z') // a Sunday

  it('is the last 7 days, oldest first, ending today', () => {
    const week = buildWeek([], now, 'UTC')
    expect(week.map((d) => d.day)).toEqual([
      '2026-10-26', '2026-10-27', '2026-10-28', '2026-10-29', '2026-10-30', '2026-10-31', '2026-11-01',
    ])
    expect(week.every((d) => !d.active)).toBe(true)
  })

  it('marks days with learning, in the learner timezone', () => {
    // 21:00 on Oct 31 in Los Angeles is already Nov 1 in UTC
    const week = buildWeek([new Date('2026-11-01T04:00:00Z')], now, 'America/Los_Angeles')
    expect(week.filter((d) => d.active).map((d) => d.day)).toEqual(['2026-10-31'])
  })
})

describe('buildPath', () => {
  const layers = [
    { layerId: 'b-3', title: 'Three', order: 3 },
    { layerId: 'b-1', title: 'One', order: 1 },
    { layerId: 'b-2', title: 'Two', order: 2 },
  ]

  it('orders layers and marks passed, current and ahead', () => {
    const progress = { currentLayer: 2, layerProgress: { 'b-1': 'done', 'b-2': 'in-progress' } }
    expect(buildPath(layers, progress).map((l) => [l.layerId, l.status])).toEqual([
      ['b-1', 'done'],
      ['b-2', 'current'],
      ['b-3', 'ahead'],
    ])
  })

  it('shows a passed current layer as passed', () => {
    const progress = { currentLayer: 3, layerProgress: { 'b-1': 'done', 'b-2': 'done', 'b-3': 'done' } }
    expect(buildPath(layers, progress).every((l) => l.status === 'done')).toBe(true)
  })
})
