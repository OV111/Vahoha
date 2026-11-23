/**
 * The hiring side's security rules, tested without a network or database:
 * the SSRF guard on company websites, the trust-level decision, the recruiter
 * lock (blockRecruiters / requireRecruiter) and the shared input rules.
 * If one of these breaks silently, strangers get access they shouldn't.
 */
import { describe, it, expect, vi } from 'vitest'
import { ObjectId } from 'mongodb'
import { isPublicAddress, safeFetchPage } from '../../modules/hiring/lib/safeFetch.js'
import { domainsMatch, nameToken, websiteHostOf } from '../../modules/hiring/lib/domain.js'
import { applyOverride, decideTrust } from '../../modules/hiring/services/trustEngine.js'
import { blockRecruiters } from '../../middleware/blockRecruiters.js'
import { requireRecruiter } from '../../middleware/requireRecruiter.js'
import { createAccessToken } from '../../utils/jwtToken.js'
import { WEBSITE_PATTERN } from '../../../constants/hiringRules.js'
import { isDisposableEmail, isFreeEmail } from '../../../constants/emailDomains.js'
import { isRecruiterBlockedPath } from '../../../constants/recruiterAccess.js'

describe('SSRF guard: isPublicAddress', () => {
  it.each([
    '127.0.0.1', '10.0.0.5', '172.16.0.1', '172.31.255.255', '192.168.1.1', '169.254.169.254',
    '100.64.0.1', '0.0.0.0', '224.0.0.1', '198.18.0.1', '::1', '::', 'fd00::1', 'fe80::1', '::ffff:127.0.0.1',
  ])('refuses %s', (ip) => {
    expect(isPublicAddress(ip)).toBe(false)
  })

  it.each(['8.8.8.8', '1.1.1.1', '93.184.216.34', '2606:4700:4700::1111'])('allows %s', (ip) => {
    expect(isPublicAddress(ip)).toBe(true)
  })

  it('refuses anything that is not an IP', () => {
    expect(isPublicAddress('localhost')).toBe(false)
  })
})

describe('SSRF guard: safeFetchPage never reaches these', () => {
  const fetchSpy = vi.spyOn(globalThis, 'fetch')

  it.each([
    ['file:///etc/passwd', 'scheme'],
    ['ftp://example.com', 'scheme'],
    ['http://example.com:8080', 'port'],
    ['http://user:pass@example.com', 'credentials'],
    ['http://127.0.0.1', 'private'],
    ['http://169.254.169.254/latest/meta-data', 'private'],
    ['http://[::1]/', 'private'],
    ['http://localhost/', 'private'],
  ])('%s → %s', async (url, error) => {
    fetchSpy.mockClear()
    const res = await safeFetchPage(url)
    expect(res.ok).toBe(false)
    expect(res.error).toBe(error)
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('rejects a string that is not a URL', async () => {
    expect(await safeFetchPage('not a url')).toEqual({ ok: false, error: 'invalid-url' })
  })
})

describe('domain helpers', () => {
  it('matches the same domain and subdomains either way, nothing else', () => {
    expect(domainsMatch('acme.com', 'acme.com')).toBe(true)
    expect(domainsMatch('eu.acme.com', 'acme.com')).toBe(true)
    expect(domainsMatch('acme.com', 'jobs.acme.com')).toBe(true)
    expect(domainsMatch('acme.com', 'evil.com')).toBe(false)
    expect(domainsMatch('notacme.com', 'acme.com')).toBe(false)
    expect(domainsMatch('', 'acme.com')).toBe(false)
  })

  it('reads the host from a website and drops www', () => {
    expect(websiteHostOf('https://www.Acme.com/jobs')).toBe('acme.com')
    expect(websiteHostOf('nonsense')).toBe('')
  })

  it('takes the first meaningful word of a company name', () => {
    expect(nameToken('The Acme Inc.')).toBe('acme')
    expect(nameToken('Example GmbH')).toBe('example')
  })

  it('knows personal and throwaway email hosts', () => {
    expect(isFreeEmail('a@gmail.com')).toBe(true)
    expect(isFreeEmail('a@acme.com')).toBe(false)
    expect(isDisposableEmail('a@mailinator.com')).toBe(true)
    expect(isDisposableEmail('a@acme.com')).toBe(false)
  })
})

describe('website rule', () => {
  it.each(['https://acme.com', 'http://acme.co.uk/jobs', 'https://www.acme-labs.io/about'])('accepts %s', (u) => {
    expect(WEBSITE_PATTERN.test(u)).toBe(true)
  })

  it.each(['acme.com', 'https://me@acme.com', 'https://localhost', 'https://acme.com:8080', 'javascript:alert(1)'])(
    'refuses %s',
    (u) => {
      expect(WEBSITE_PATTERN.test(u)).toBe(false)
    },
  )
})

describe('decideTrust', () => {
  const strong = { workEmail: true, domainMatch: true, websiteLive: true, domainNotNew: true }
  const decide = (over = {}, checks = {}) =>
    decideTrust({ disposable: false, mailRecords: true, emailVerified: true, checks: { ...strong, ...checks }, ...over })

  it('verifies only when every signal is strong', () => {
    expect(decide().level).toBe('verified')
  })

  it('rejects throwaway email and domains without mail, before anything else', () => {
    expect(decide({ disposable: true }).level).toBe('rejected')
    expect(decide({ mailRecords: false }).level).toBe('rejected')
    expect(decide({ disposable: true, emailVerified: false }).level).toBe('rejected')
  })

  it('stays unverified until the email code is entered', () => {
    expect(decide({ emailVerified: false }).level).toBe('unverified')
  })

  it.each([
    [{ workEmail: false }, 'personal email'],
    [{ domainMatch: false }, "doesn't match"],
    [{ websiteLive: false }, 'open the website'],
    [{ domainNotNew: false }, 'days old'],
  ])('one weak signal (%o) means limited, with the reason', (checks, words) => {
    const { level, reasons } = decide({}, checks)
    expect(level).toBe('limited')
    expect(reasons.join(' ')).toContain(words)
  })
})

describe('applyOverride', () => {
  const trust = { level: 'limited', reasons: [], checks: {} }

  it('an admin pin wins and keeps the computed level beside it', () => {
    const out = applyOverride(trust, { level: 'verified', note: 'checked by hand' })
    expect(out.level).toBe('verified')
    expect(out.computedLevel).toBe('limited')
  })

  it('a report limit keeps a re-check from lifting a company back to verified', () => {
    const out = applyOverride({ ...trust, level: 'verified' }, null, { reason: 'reported', at: new Date() })
    expect(out.level).toBe('limited')
  })

  it('without a pin or a report it changes nothing', () => {
    expect(applyOverride(trust, null)).toEqual(trust)
  })
})

// A fake Express request/response and a fake db for the two middlewares.
const run = async (middleware, { role, companyLevel, method = 'POST', token = true } = {}) => {
  const userId = new ObjectId()
  const companyId = new ObjectId()
  const db = {
    collection: (name) => ({
      findOne: async () =>
        name === 'users'
          ? role === undefined ? null : { _id: userId, role, companyId }
          : companyLevel === undefined ? null : { trust: { level: companyLevel } },
    }),
  }
  const req = {
    method,
    headers: token ? { authorization: `Bearer ${createAccessToken({ id: String(userId) })}` } : {},
    user: { _id: userId },
    app: { locals: { db } },
  }
  const res = { statusCode: 200, body: null, status(c) { this.statusCode = c; return this }, json(b) { this.body = b; return this } }
  let nextCalled = false
  await middleware(req, res, (err) => { if (err) throw err; nextCalled = true })
  return { nextCalled, status: res.statusCode, body: res.body, req }
}

describe('blockRecruiters', () => {
  it('refuses a recruiter with the view-only reason', async () => {
    const r = await run(blockRecruiters(), { role: 'recruiter' })
    expect(r.nextCalled).toBe(false)
    expect(r.status).toBe(403)
    expect(r.body.reason).toBe('recruiter_view_only')
  })

  it('lets learners through', async () => {
    expect((await run(blockRecruiters(), { role: 'user' })).nextCalled).toBe(true)
    expect((await run(blockRecruiters(), {})).nextCalled).toBe(true)
  })

  it('view-only mode lets a recruiter read but not write', async () => {
    expect((await run(blockRecruiters({ allowReads: true }), { role: 'recruiter', method: 'GET' })).nextCalled).toBe(true)
    expect((await run(blockRecruiters({ allowReads: true }), { role: 'recruiter', method: 'POST' })).status).toBe(403)
  })

  it('steps aside without a token, so the route\'s own auth answers', async () => {
    expect((await run(blockRecruiters(), { role: 'recruiter', token: false })).nextCalled).toBe(true)
  })
})

describe('requireRecruiter', () => {
  it('answers 404 to anyone who is not a recruiter', async () => {
    const r = await run(requireRecruiter('limited'), { role: 'user' })
    expect(r.nextCalled).toBe(false)
    expect(r.status).toBe(404)
  })

  it('enforces the minimum trust level', async () => {
    expect((await run(requireRecruiter('verified'), { role: 'recruiter', companyLevel: 'limited' })).status).toBe(403)
    expect((await run(requireRecruiter('limited'), { role: 'recruiter', companyLevel: 'limited' })).nextCalled).toBe(true)
    expect((await run(requireRecruiter('limited'), { role: 'recruiter', companyLevel: 'verified' })).nextCalled).toBe(true)
  })

  it('never lets a rejected or unverified company past "limited"', async () => {
    expect((await run(requireRecruiter('limited'), { role: 'recruiter', companyLevel: 'rejected' })).status).toBe(403)
    expect((await run(requireRecruiter('limited'), { role: 'recruiter', companyLevel: 'unverified' })).status).toBe(403)
  })

  it('puts the company on the request for scoping', async () => {
    const r = await run(requireRecruiter('limited'), { role: 'recruiter', companyLevel: 'verified' })
    expect(r.req.recruiter.trustLevel).toBe('verified')
    expect(r.req.recruiter.companyId).toBeInstanceOf(ObjectId)
  })
})

describe('recruiter page lock', () => {
  it('sends recruiters away from learner-only pages, including sub-pages', () => {
    for (const p of ['/mentor', '/roadmaps/exam/x', '/my-profile/chats', '/judgment/run/1', '/my-profile/intros']) {
      expect(isRecruiterBlockedPath(p)).toBe(true)
    }
  })

  it('keeps view-only pages open', () => {
    for (const p of ['/', '/roadmaps', '/coding-challenges', '/blogs', '/libs', '/candidate/vahe1']) {
      expect(isRecruiterBlockedPath(p)).toBe(false)
    }
  })
})
