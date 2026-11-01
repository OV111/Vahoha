import { describe, it, expect } from 'vitest'
import {
  sanitizeLayerProgress,
  doneLayerIds,
  firstOpenLayer,
} from '../../services/layerProgress.js'

describe('sanitizeLayerProgress', () => {
  it('downgrades a "done" the server never awarded', () => {
    expect(sanitizeLayerProgress({ 'api-dev-1': 'done' }, [])).toEqual({
      'api-dev-1': 'in-progress',
    })
  })

  it('keeps a "done" the exam engine already awarded', () => {
    expect(sanitizeLayerProgress({ 'api-dev-1': 'done' }, ['api-dev-1'])).toEqual({
      'api-dev-1': 'done',
    })
  })

  it('never lets a stale client copy revoke an earned layer', () => {
    expect(sanitizeLayerProgress({ 'api-dev-1': 'in-progress' }, ['api-dev-1'])).toEqual({
      'api-dev-1': 'done',
    })
    expect(sanitizeLayerProgress({}, ['api-dev-1'])).toEqual({ 'api-dev-1': 'done' })
  })

  it('passes other statuses through and drops non-string values', () => {
    expect(
      sanitizeLayerProgress({ a: 'in-progress', b: 'locked', c: 5, d: null }, []),
    ).toEqual({ a: 'in-progress', b: 'locked' })
  })

  it('tolerates a missing map', () => {
    expect(sanitizeLayerProgress(undefined, [])).toEqual({})
  })
})

describe('doneLayerIds', () => {
  it('reads done layers from the map only, ignoring the completedLayers mirror', () => {
    const doc = {
      layerProgress: { a: 'done', b: 'in-progress' },
      completedLayers: ['a', 'c'],
    }
    expect(doneLayerIds(doc)).toEqual(['a'])
  })

  it('returns an empty list when there is no progress document', () => {
    expect(doneLayerIds(null)).toEqual([])
  })
})

describe('firstOpenLayer', () => {
  const track = [
    { layerId: 't-3', order: 3 },
    { layerId: 't-1', order: 1 },
    { layerId: 't-2', order: 2 },
  ]

  it('is the lowest-order layer not yet passed', () => {
    expect(firstOpenLayer(track, [])).toBe(1)
    expect(firstOpenLayer(track, ['t-1'])).toBe(2)
  })

  it('skips past a gap rather than stopping at the first passed layer', () => {
    expect(firstOpenLayer(track, ['t-1', 't-3'])).toBe(2)
  })

  it('stays on the last layer once every layer is passed', () => {
    expect(firstOpenLayer(track, ['t-1', 't-2', 't-3'])).toBe(3)
  })

  it('is null for a track with no layers', () => {
    expect(firstOpenLayer([], [])).toBeNull()
  })
})
