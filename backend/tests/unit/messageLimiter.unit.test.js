import { describe, it, expect } from 'vitest'
import { createMessageLimiter } from '../../websocket/messageLimiter.js'

// A fake clock, so the window can be stepped through without waiting.
const clock = (start = 0) => {
  let t = start
  return { now: () => t, advance: (ms) => (t += ms) }
}

describe('createMessageLimiter', () => {
  it('allows up to the limit inside one window', () => {
    const c = clock()
    const check = createMessageLimiter({ limit: 3, windowMs: 1000, now: c.now })
    expect([check(), check(), check()]).toEqual(['ok', 'ok', 'ok'])
  })

  it('refuses the next message, then allows again once the window has passed', () => {
    const c = clock()
    const check = createMessageLimiter({ limit: 2, windowMs: 1000, now: c.now })
    check()
    check()
    expect(check()).toBe('limited')
    c.advance(1001)
    expect(check()).toBe('ok')
  })

  it('slides: old messages leave the window one by one', () => {
    const c = clock()
    const check = createMessageLimiter({ limit: 2, windowMs: 1000, now: c.now })
    check() // t=0
    c.advance(600)
    check() // t=600
    c.advance(500) // t=1100: the first has left, the second has not
    expect(check()).toBe('ok')
    expect(check()).toBe('limited')
  })

  it('asks to close the connection after repeated refusals', () => {
    const c = clock()
    const check = createMessageLimiter({ limit: 1, windowMs: 1000, maxStrikes: 3, now: c.now })
    check()
    expect([check(), check(), check()]).toEqual(['limited', 'limited', 'close'])
  })

  it('keeps no state between connections', () => {
    const c = clock()
    const a = createMessageLimiter({ limit: 1, windowMs: 1000, now: c.now })
    const b = createMessageLimiter({ limit: 1, windowMs: 1000, now: c.now })
    a()
    expect(a()).toBe('limited')
    expect(b()).toBe('ok')
  })
})
