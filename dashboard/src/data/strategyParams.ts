// CONFIRMED public default parameters (see researchFindings.ts, confirmed set).
// These are the only numeric defaults in this file that are sourced from public documentation.
// Everything else in the dashboard derived from them (thresholds, trigger prices) is arithmetic,
// not additional vendor disclosure.

export interface StrategyParams {
  buyPercent: number
  trailingBuyStep: number
  trailingBuyFloorBuffer: number
  sellPercent: number
  trailingSellStep: number
  trailingSellFloorBuffer: number
  limitPriceOffset: number
}

export const defaultParams: StrategyParams = {
  buyPercent: 0.32,
  trailingBuyStep: 0.7,
  trailingBuyFloorBuffer: 0.03,
  sellPercent: 0.55,
  trailingSellStep: 0.7,
  trailingSellFloorBuffer: 0.03,
  limitPriceOffset: 0,
}

export const paramRanges: Record<keyof StrategyParams, { min: number; max: number; step: number }> = {
  buyPercent: { min: 0.05, max: 5, step: 0.01 },
  trailingBuyStep: { min: 0.05, max: 5, step: 0.01 },
  trailingBuyFloorBuffer: { min: 0, max: 1, step: 0.01 },
  sellPercent: { min: 0.05, max: 5, step: 0.01 },
  trailingSellStep: { min: 0.05, max: 5, step: 0.01 },
  trailingSellFloorBuffer: { min: 0, max: 1, step: 0.01 },
  limitPriceOffset: { min: -20, max: 20, step: 0.5 },
}

export const paramLabels: Record<keyof StrategyParams, string> = {
  buyPercent: 'Buy threshold',
  trailingBuyStep: 'Trailing buy step',
  trailingBuyFloorBuffer: 'Trailing buy floor buffer',
  sellPercent: 'Sell threshold',
  trailingSellStep: 'Trailing sell step',
  trailingSellFloorBuffer: 'Trailing sell floor buffer',
  limitPriceOffset: 'Limit price offset',
}

// ASSUMED — this trigger model (Model B from the working spec) is one of several candidate
// interpretations of the publicly-undisclosed trailing formula (see unknowns.md, u2).
export function buyTrigger(referencePrice: number, dipLow: number, p: StrategyParams) {
  const buyThreshold = referencePrice * (1 - p.buyPercent / 100)
  const buyFloor = buyThreshold * (1 + p.trailingBuyFloorBuffer / 100)
  const trailingTrigger = Math.max(buyFloor, dipLow * (1 + p.trailingBuyStep / 100))
  return { buyThreshold, buyFloor, trailingTrigger }
}

export function sellTrigger(entryPrice: number, peakHigh: number, p: StrategyParams) {
  const sellThreshold = entryPrice * (1 + p.sellPercent / 100)
  const sellFloor = sellThreshold * (1 + p.trailingSellFloorBuffer / 100)
  const trailingTrigger = Math.max(sellFloor, peakHigh * (1 - p.trailingSellStep / 100))
  return { sellThreshold, sellFloor, trailingTrigger }
}
