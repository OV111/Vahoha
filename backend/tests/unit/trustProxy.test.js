import { describe, it, expect } from 'vitest'
import { createApp } from '../../app.js'

describe('trust proxy', () => {
  it('trusts exactly one proxy hop (Render load balancer)', () => {
    const app = createApp({})
    // `true` would let clients spoof X-Forwarded-For and dodge rate limits.
    expect(app.get('trust proxy')).toBe(1)
  })
})
