import { describe, it, expect } from 'vitest'
import {
  prerequisiteIds,
  missingPrerequisites,
} from '../../services/layerUnlock.js'

describe('prerequisiteIds', () => {
  it('uses an explicit requires list', () => {
    expect(prerequisiteIds({ layerId: 'c', requires: ['a', 'b'] }, { layerId: 'b' })).toEqual(['a', 'b'])
  })

  it('treats an empty requires as a root layer, even if a previous layer exists', () => {
    expect(prerequisiteIds({ layerId: 'a', requires: [] }, { layerId: 'z' })).toEqual([])
  })

  it('falls back to the previous layer when requires is absent', () => {
    expect(prerequisiteIds({ layerId: 'b' }, { layerId: 'a' })).toEqual(['a'])
  })

  it('has no prerequisites for a first layer without requires', () => {
    expect(prerequisiteIds({ layerId: 'a' }, null)).toEqual([])
  })
})

describe('missingPrerequisites', () => {
  it('returns only the ones not done', () => {
    expect(missingPrerequisites(['a', 'b', 'c'], ['a', 'c'])).toEqual(['b'])
  })

  it('returns nothing when all are done or none are required', () => {
    expect(missingPrerequisites(['a'], ['a'])).toEqual([])
    expect(missingPrerequisites([], [])).toEqual([])
  })
})
