import { describe, it, expect } from 'vitest'
import {
  sanitizeLayerProgress,
  doneLayerIds,
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
  it('reads done layers from the map and completedLayers, without duplicates', () => {
    const doc = {
      layerProgress: { a: 'done', b: 'in-progress' },
      completedLayers: ['a', 'c'],
    }
    expect(doneLayerIds(doc).sort()).toEqual(['a', 'c'])
  })

  it('returns an empty list when there is no progress document', () => {
    expect(doneLayerIds(null)).toEqual([])
  })
})
