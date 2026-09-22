// SIMULATED DATA — NOT REAL MARKET DATA, NOT A REAL BACKTEST RESULT.
//
// This generates a synthetic random-walk BTC/EUR-like price series and runs it through the
// independent state machine (stateMachine.ts / strategyParams.ts) purely to demonstrate the UI.
// No historical Bitvavo data has been acquired yet (see RESEARCH_STATUS.md blockers) — this file
// must never be presented, quoted, or exported as evidence of real trading performance.

import { buyTrigger, defaultParams, sellTrigger, type StrategyParams } from './strategyParams'

// Deterministic PRNG so the "demo" is reproducible across renders/builds, not because it is a
// hidden claim of real data — it is exactly as fake on every run.
function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export interface SimTick {
  t: number
  price: number
  reference: number
  equity: number
  state: string
}

export interface SimTrade {
  entryT: number
  entryPrice: number
  exitT: number
  exitPrice: number
  pnlPercent: number
}

export interface SimResult {
  ticks: SimTick[]
  trades: SimTrade[]
  finalEquityMultiple: number
  maxDrawdownPercent: number
}

export function runSimulatedDemo(params: StrategyParams = defaultParams, seed = 42, steps = 2000): SimResult {
  const rand = mulberry32(seed)
  const refPeriod = 20
  const priceHistory: number[] = []
  const ticks: SimTick[] = []
  const trades: SimTrade[] = []

  let price = 60000
  let equity = 1
  let peakEquity = 1
  let maxDrawdown = 0

  let state: 'FLAT' | 'TRACKING_DIP' | 'LONG' | 'TRACKING_PEAK' = 'FLAT'
  let dipLow = 0
  let entryPrice = 0
  let peakHigh = 0

  for (let t = 0; t < steps; t++) {
    // Synthetic random walk with mild mean reversion, NOT a model of real BTC/EUR behavior.
    const drift = (60000 - price) * 0.0006
    const shock = (rand() - 0.5) * 240
    price = Math.max(1000, price + drift + shock)
    priceHistory.push(price)

    const window = priceHistory.slice(-refPeriod)
    const reference = window.reduce((a, b) => a + b, 0) / window.length

    if (priceHistory.length >= refPeriod) {
      if (state === 'FLAT') {
        const { buyThreshold } = buyTrigger(reference, price, params)
        if (price <= buyThreshold) {
          state = 'TRACKING_DIP'
          dipLow = price
        }
      } else if (state === 'TRACKING_DIP') {
        dipLow = Math.min(dipLow, price)
        const { trailingTrigger } = buyTrigger(reference, dipLow, params)
        if (price >= trailingTrigger) {
          state = 'LONG'
          entryPrice = price
        }
      } else if (state === 'LONG') {
        const threshold = entryPrice * (1 + params.sellPercent / 100)
        if (price >= threshold) {
          state = 'TRACKING_PEAK'
          peakHigh = price
        }
      } else if (state === 'TRACKING_PEAK') {
        peakHigh = Math.max(peakHigh, price)
        const { trailingTrigger } = sellTrigger(entryPrice, peakHigh, params)
        if (price <= trailingTrigger) {
          const pnlPercent = ((price - entryPrice) / entryPrice) * 100
          equity *= price / entryPrice
          trades.push({ entryT: t, entryPrice, exitT: t, exitPrice: price, pnlPercent })
          state = 'FLAT'
        }
      }
    }

    peakEquity = Math.max(peakEquity, equity)
    const drawdown = ((peakEquity - equity) / peakEquity) * 100
    maxDrawdown = Math.max(maxDrawdown, drawdown)

    ticks.push({ t, price, reference, equity, state })
  }

  return { ticks, trades, finalEquityMultiple: equity, maxDrawdownPercent: maxDrawdown }
}
