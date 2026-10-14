import { describe, it, expect, vi } from 'vitest'

// REDIS_ENABLED=false → no Queue/Worker: add() must still save and push.
vi.mock('../../config/redis.js', () => ({ redisConnection: null }))
const createNotification = vi.fn()
const sendToUser = vi.fn()
vi.mock('../../config/db.js', () => ({ default: async () => ({}) }))
vi.mock('../../modules/notifications/index.js', () => ({ createNotification }))
vi.mock('../../websocket/connectionRegistry.js', () => ({ sendToUser }))

const { default: queue } = await import('../../queues/notificationQueue.js')

describe('notificationQueue without Redis', () => {
  it('saves the notification and pushes it to the target user', async () => {
    const saved = { _id: 'n1', type: 'follow', read: false }
    createNotification.mockResolvedValueOnce(saved)
    await queue.add('follow', { type: 'follow', actorId: 'a', targetUserId: 'b' })
    expect(createNotification).toHaveBeenCalledWith({}, { type: 'follow', actorId: 'a', targetUserId: 'b' })
    expect(sendToUser).toHaveBeenCalledWith('b', { type: 'notification', data: saved })
  })

  it('does not push when nothing was created (self-notify)', async () => {
    sendToUser.mockClear()
    createNotification.mockResolvedValueOnce(null)
    await queue.add('follow', { type: 'follow', actorId: 'a', targetUserId: 'a' })
    expect(sendToUser).not.toHaveBeenCalled()
  })

  it('never throws into the caller', async () => {
    createNotification.mockRejectedValueOnce(new Error('db down'))
    await expect(queue.add('x', { type: 'follow', actorId: 'a', targetUserId: 'b' })).resolves.toBeUndefined()
  })
})
