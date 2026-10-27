import { describe, it, expect } from 'vitest'
import { findHints, MAX_HINTS_PER_PR } from '../../modules/system-map/lib/driftRules.js'

const files = (...paths) => paths.map((path) => ({ path, additions: 1, deletions: 0 }))
const graph = (...nodes) => ({ nodes })

describe('findHints: infrastructure and dependency files', () => {
  it.each([
    ['package.json', 'Dependencies changed'],
    ['server/package.json', 'Dependencies changed'],
    ['requirements.txt', 'Dependencies changed'],
    ['requirements-dev.txt', 'Dependencies changed'],
    ['pyproject.toml', 'Dependencies changed'],
    ['go.mod', 'Dependencies changed'],
    ['Dockerfile', 'Container setup changed'],
    ['api/Dockerfile.prod', 'Container setup changed'],
    ['docker-compose.yml', 'Container setup changed'],
    ['docker-compose.override.yaml', 'Container setup changed'],
    ['infra/main.tf', 'Infrastructure changed'],
    ['k8s/deployment.yaml', 'Infrastructure changed'],
    ['deploy/helm/values.yml', 'Infrastructure changed'],
    ['charts/api/Chart.yaml', 'Infrastructure changed'],
    ['.github/workflows/ci.yml', 'Build pipeline changed'],
    ['prisma/schema.prisma', 'Database schema changed'],
    ['.env.example', 'Configuration changed'],
  ])('flags %s as "%s"', (path, reason) => {
    expect(findHints(files(path), graph())).toEqual([{ path, reason }])
  })

  it('ignores ordinary source files', () => {
    expect(findHints(files('src/App.jsx', 'README.md', 'backend/routes/users.js'), graph())).toEqual([])
  })

  it.each(['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'poetry.lock', 'go.sum', 'web/package-lock.json'])(
    'ignores the lockfile %s',
    (path) => {
      expect(findHints(files(path), graph())).toEqual([])
    },
  )

  it('does not mistake look-alike names for infrastructure files', () => {
    expect(findHints(files('src/package.jsonx', 'docs/Dockerfile-notes.md', 'my.tfstate.js'), graph())).toEqual([])
  })
})

describe('findHints: evidence', () => {
  const express = { title: 'API server', evidence: ['server/index.js', 'backend/routes'] }

  it('flags a file that is a part\'s evidence, naming the part', () => {
    expect(findHints(files('server/index.js'), graph(express))).toEqual([
      { path: 'server/index.js', reason: 'This file backs your API server part' },
    ])
  })

  it('flags a file under an evidence directory', () => {
    expect(findHints(files('backend/routes/orders.js'), graph(express))).toEqual([
      { path: 'backend/routes/orders.js', reason: 'This file backs your API server part' },
    ])
  })

  it('does not treat a sibling with the same prefix as "under" the evidence', () => {
    expect(findHints(files('backend/routes-old/a.js'), graph(express))).toEqual([])
  })

  it('prefers the evidence reason over the generic one', () => {
    const node = { title: 'Web app', evidence: ['package.json'] }
    expect(findHints(files('package.json'), graph(node))[0].reason).toBe('This file backs your Web app part')
  })

  it('tolerates a leading ./ on evidence and missing evidence on parts', () => {
    const nodes = [{ title: 'A' }, { title: 'DB', evidence: ['./db/schema.sql'] }]
    expect(findHints(files('db/schema.sql'), graph(...nodes))).toHaveLength(1)
  })
})

describe('findHints: limits and bad input', () => {
  it('dedupes by path and caps the number of hints', () => {
    const many = Array.from({ length: 30 }, (_, i) => `svc${i}/package.json`)
    const hints = findHints(files(...many, many[0], many[0]), graph())
    expect(hints).toHaveLength(MAX_HINTS_PER_PR)
    expect(new Set(hints.map((h) => h.path)).size).toBe(MAX_HINTS_PER_PR)
  })

  it('survives missing or malformed input', () => {
    expect(findHints(undefined, undefined)).toEqual([])
    expect(findHints([null, {}, { path: 42 }, { path: '' }], graph())).toEqual([])
  })
})
