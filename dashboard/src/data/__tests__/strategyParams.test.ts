import { describe, expect, it } from 'vitest'
import { buyTrigger, defaultParams, sellTrigger } from '../strategyParams'

describe('buyTrigger', () => {
  it('computes buy threshold as reference reduced by buy_percent', () => {
    const { buyThreshold } = buyTrigger(100_000, 100_000, defaultParams)
    expect(buyThreshold).toBeCloseTo(100_000 * (1 - 0.32 / 100), 6)
  })

  it('never returns a trailing trigger below the floor, even on a barely-below-threshold dip', () => {
    const reference = 100_000
    const shallowDip = reference * (1 - 0.32 / 100) - 0.01 // just under threshold
    const { buyFloor, trailingTrigger } = buyTrigger(reference, shallowDip, defaultParams)
    expect(trailingTrigger).toBeGreaterThanOrEqual(buyFloor)
  })

  it('trailing trigger falls with a deeper dip, outside the floor-clamped region', () => {
    // Both dips chosen comfortably below buyThreshold but above the point where
    // dipLow * (1 + trailing_buy_step) drops under buyFloor, so the floor clamp
    // (tested separately above) is not what's being exercised here.
    const reference = 100_000
    const shallowDip = 99_600
    const deepDip = 99_100
    const shallow = buyTrigger(reference, shallowDip, defaultParams)
    const deep = buyTrigger(reference, deepDip, defaultParams)
    expect(deep.trailingTrigger).toBeLessThan(shallow.trailingTrigger)
  })
})

describe('sellTrigger', () => {
  it('computes sell threshold as entry price increased by sell_percent', () => {
    const { sellThreshold } = sellTrigger(100_000, 100_000, defaultParams)
    expect(sellThreshold).toBeCloseTo(100_000 * (1 + 0.55 / 100), 6)
  })

  it('never returns a trailing trigger below the floor on a barely-above-threshold peak', () => {
    const entry = 100_000
    const shallowPeak = entry * (1 + 0.55 / 100) + 0.01
    const { sellFloor, trailingTrigger } = sellTrigger(entry, shallowPeak, defaultParams)
    expect(trailingTrigger).toBeGreaterThanOrEqual(sellFloor)
  })

  it('trailing trigger rises with a higher peak (trailing profit, not a fixed exit price)', () => {
    const entry = 100_000
    const shallowPeak = 100_600
    const highPeak = 105_000
    const shallow = sellTrigger(entry, shallowPeak, defaultParams)
    const high = sellTrigger(entry, highPeak, defaultParams)
    expect(high.trailingTrigger).toBeGreaterThan(shallow.trailingTrigger)
  })
})
