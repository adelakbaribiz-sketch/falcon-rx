import { describe, expect, it } from 'vitest'
import { runSimulatedDemo } from '../demoBacktest'

describe('runSimulatedDemo (synthetic data — sanity checks only, not a performance claim)', () => {
  it('is deterministic for a given seed', () => {
    const a = runSimulatedDemo(undefined, 7, 500)
    const b = runSimulatedDemo(undefined, 7, 500)
    expect(a.finalEquityMultiple).toBe(b.finalEquityMultiple)
    expect(a.trades.length).toBe(b.trades.length)
  })

  it('produces a different run for a different seed', () => {
    const a = runSimulatedDemo(undefined, 1, 500)
    const b = runSimulatedDemo(undefined, 2, 500)
    expect(a.ticks.map((t) => t.price)).not.toEqual(b.ticks.map((t) => t.price))
  })

  it('never sells at a loss (baseline: no forced stop-loss)', () => {
    const result = runSimulatedDemo(undefined, 42, 3000)
    for (const trade of result.trades) {
      expect(trade.exitPrice).toBeGreaterThanOrEqual(trade.entryPrice)
    }
  })

  it('produces exactly as many ticks as requested', () => {
    const result = runSimulatedDemo(undefined, 3, 250)
    expect(result.ticks.length).toBe(250)
  })
})
