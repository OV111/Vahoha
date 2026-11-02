import { describe, it, expect } from 'vitest'
import {
  assignRefusal,
  boardIsOpen,
  canPlanSprints,
  deleteRefusal,
  derivePrefix,
  isTeamLead,
  moveRefusal,
  sprintProgress,
} from '../../modules/teams/lib/taskRules.js'

const humanLed = { status: 'active', leadId: 'lead', coLeadId: null }
const aiLed = { status: 'active', leadId: 'ai', coLeadId: 'co' }

describe('derivePrefix', () => {
  it('uses initials for several words, at most four', () => {
    expect(derivePrefix('TaskFlow API')).toBe('TA')
    expect(derivePrefix('one two three four five')).toBe('OTTF')
  })
  it('uses the first three letters of a single word', () => {
    expect(derivePrefix('Payments')).toBe('PAY')
  })
  it('ignores digits and symbols, and falls back when too short', () => {
    expect(derivePrefix('42 !!')).toBe('TM')
    expect(derivePrefix('X')).toBe('TM')
    expect(derivePrefix('')).toBe('TM')
  })
})

describe('isTeamLead', () => {
  it('matches the human lead and the co-lead, never the AI marker', () => {
    expect(isTeamLead(humanLed, 'lead')).toBe(true)
    expect(isTeamLead(aiLed, 'co')).toBe(true)
    expect(isTeamLead(aiLed, 'someone')).toBe(false)
  })
})

describe('assignRefusal', () => {
  const free = { assigneeId: null }
  it('lets anyone take a free task for themselves', () => {
    expect(assignRefusal(humanLed, free, 'ann', 'ann')).toBeNull()
  })
  it('lets anyone drop their own task', () => {
    expect(assignRefusal(humanLed, { assigneeId: 'ann' }, 'ann', null)).toBeNull()
  })
  it('stops a member giving a task to someone else', () => {
    expect(assignRefusal(humanLed, free, 'ann', 'bob')).toMatch(/lead/)
  })
  it('stops a member taking a task already assigned to someone else', () => {
    expect(assignRefusal(humanLed, { assigneeId: 'bob' }, 'ann', 'ann')).toMatch(/lead/)
  })
  it('lets the lead and the co-lead assign anyone', () => {
    expect(assignRefusal(humanLed, { assigneeId: 'bob' }, 'lead', 'ann')).toBeNull()
    expect(assignRefusal(aiLed, free, 'co', 'ann')).toBeNull()
  })
  it('allows a no-op', () => {
    expect(assignRefusal(humanLed, { assigneeId: 'bob' }, 'ann', 'bob')).toBeNull()
  })
})

describe('moveRefusal', () => {
  it('allows moves between the manual columns', () => {
    expect(moveRefusal({ status: 'backlog' }, 'in_progress')).toBeNull()
    expect(moveRefusal({ status: 'in_review' }, 'backlog')).toBeNull()
  })
  it('never moves a task to done by hand', () => {
    expect(moveRefusal({ status: 'in_review' }, 'done')).toMatch(/merged/)
  })
  it('never moves a done task out of done', () => {
    expect(moveRefusal({ status: 'done' }, 'backlog')).toMatch(/merged/)
  })
})

describe('deleteRefusal', () => {
  it('keeps any task with a linked PR', () => {
    expect(deleteRefusal(humanLed, { creatorId: 'ann', pr: { number: 3 } }, 'ann')).toMatch(/pull request/)
  })
  it('lets the creator or the lead delete', () => {
    expect(deleteRefusal(humanLed, { creatorId: 'ann', pr: null }, 'ann')).toBeNull()
    expect(deleteRefusal(humanLed, { creatorId: 'ann', pr: null }, 'lead')).toBeNull()
  })
  it('stops anyone else', () => {
    expect(deleteRefusal(humanLed, { creatorId: 'ann', pr: null }, 'bob')).toMatch(/created/)
  })
})

describe('canPlanSprints and boardIsOpen', () => {
  it('lets the lead, co-lead or an admin plan', () => {
    expect(canPlanSprints(humanLed, 'lead', false)).toBe(true)
    expect(canPlanSprints(aiLed, 'co', false)).toBe(true)
    expect(canPlanSprints(aiLed, 'ann', true)).toBe(true)
    expect(canPlanSprints(aiLed, 'ann', false)).toBe(false)
  })
  it('closes the board once a team is completed or disbanded', () => {
    expect(boardIsOpen({ status: 'defending' })).toBe(true)
    expect(boardIsOpen({ status: 'completed' })).toBe(false)
    expect(boardIsOpen({ status: 'disbanded' })).toBe(false)
  })
})

describe('sprintProgress', () => {
  it('counts done tasks', () => {
    expect(sprintProgress([{ status: 'done' }, { status: 'backlog' }, { status: 'done' }, { status: 'in_review' }])).toEqual({ done: 2, total: 4, percent: 50 })
  })
  it('is zero for an empty sprint', () => {
    expect(sprintProgress([])).toEqual({ done: 0, total: 0, percent: 0 })
  })
})
