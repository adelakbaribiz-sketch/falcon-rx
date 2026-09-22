import { describe, expect, it } from 'vitest'
import { states, transitions } from '../stateMachine'

describe('state machine data integrity', () => {
  const stateIds = new Set(states.map((s) => s.id))

  it('every transition references states that actually exist', () => {
    for (const t of transitions) {
      expect(stateIds.has(t.from), `unknown 'from' state: ${t.from}`).toBe(true)
      expect(stateIds.has(t.to), `unknown 'to' state: ${t.to}`).toBe(true)
    }
  })

  it('FLAT has an outgoing transition into the dip-tracking cycle', () => {
    expect(transitions.some((t) => t.from === 'FLAT' && t.to === 'TRACKING_DIP')).toBe(true)
  })

  it('the baseline cycle closes: TRACKING_PEAK can return to FLAT', () => {
    expect(transitions.some((t) => t.from === 'TRACKING_PEAK' && t.to === 'FLAT')).toBe(true)
  })

  it('no state id is duplicated', () => {
    expect(states.length).toBe(stateIds.size)
  })
})
