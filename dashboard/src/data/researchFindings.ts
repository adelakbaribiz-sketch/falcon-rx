// Transcribed from /falcon-rx/research/*.md (Phase 1 research, accessed 2026-09-22).
// This is real research content, not fabricated — but it summarizes public documentation of a
// third-party product (FalconTrader / BLCKMGIC GmbH), not this project's own proprietary work.
// See the source markdown files for full citations before treating any line here as authoritative.

export type Confidence = 'confirmed' | 'inferred' | 'unknown'

export interface Finding {
  id: string
  confidence: Confidence
  claim: string
  source: string
}

export const confirmedFacts: Finding[] = [
  {
    id: 'c1',
    confidence: 'confirmed',
    claim: 'buy_percent default 0.32% (range 0.05–5.00%) — how far price must drop below the reference mark before a buy arms.',
    source: 'docs.falcontrader.de/en.html',
  },
  {
    id: 'c2',
    confidence: 'confirmed',
    claim: 'trailing_buy_step default 0.70% — bot waits for a bounce of this size from the deepest dip before buying, rather than buying at the threshold.',
    source: 'docs.falcontrader.de/en.html',
  },
  {
    id: 'c3',
    confidence: 'confirmed',
    claim: 'trailing_buy_floor_buffer default 0.03% — safety buffer preventing the trailing trigger from never firing on shallow dips.',
    source: 'docs.falcontrader.de/en.html',
  },
  {
    id: 'c4',
    confidence: 'confirmed',
    claim: 'sell_percent default 0.55% — how far above the user’s own buy price the market must move before a sell arms. Vendor states this accounts for ~0.5% round-trip exchange fees.',
    source: 'docs.falcontrader.de/en.html + de.html',
  },
  {
    id: 'c5',
    confidence: 'confirmed',
    claim: 'trailing_sell_step default 0.70%, trailing_sell_floor_buffer default 0.03% — mirrors the buy-side trailing/floor mechanics.',
    source: 'docs.falcontrader.de/en.html',
  },
  {
    id: 'c6',
    confidence: 'confirmed',
    claim: 'limit_price_offset default 0% (range −20% to +20%) — shifts the upper market ceiling above which the bot stops buying.',
    source: 'docs.falcontrader.de/en.html',
  },
  {
    id: 'c7',
    confidence: 'confirmed',
    claim: 'No forced stop-loss: the bot never automatically sells below the user’s own purchase price. Positions can stay open and underwater during a decline.',
    source: 'falcontrader.de + docs.falcontrader.de/de.html',
  },
  {
    id: 'c8',
    confidence: 'confirmed',
    claim: 'Execution model: trades happen directly on the user’s own Bitvavo account via an API key scoped to View + Trade only — never Withdraw.',
    source: 'falcontrader.de + docs.falcontrader.de/de.html',
  },
]

export const inferredHypotheses: Finding[] = [
  {
    id: 'i1',
    confidence: 'inferred',
    claim: 'Reference price is some moving average of recent price — vendor copy references "the moving average and smallest fluctuations" as the entry-timing basis, but not the type or period.',
    source: 'falcontrader.de marketing copy (MEDIUM-CONFIDENCE INFERENCE)',
  },
  {
    id: 'i2',
    confidence: 'inferred',
    claim: 'The sell threshold (0.55%) is fee-and-edge aware by design; the buy threshold (0.32%) is not described the same way and looks like a pure entry-timing trigger.',
    source: 'Derived from c4 (MEDIUM-CONFIDENCE INFERENCE)',
  },
  {
    id: 'i3',
    confidence: 'inferred',
    claim: 'Trailing behavior is likely a simple fixed-percentage trailing formula, not volatility-adjusted — no "adaptive" or ATR language found anywhere in vendor copy.',
    source: 'Absence of disclosure (MEDIUM-CONFIDENCE INFERENCE)',
  },
]

export const unknowns: Finding[] = [
  {
    id: 'u1',
    confidence: 'unknown',
    claim: 'Reference price construction: MA family (SMA/EMA/WMA/VWMA/other), period, and price basis (last trade / mid / best bid / best ask) — not disclosed anywhere found.',
    source: 'Genuine gap — resolved only by hypothesis testing against market data (Phase 6), not further search.',
  },
  {
    id: 'u2',
    confidence: 'unknown',
    claim: 'Exact trailing-buy and trailing-sell trigger formula (how dip_low / peak_high combine with the step and floor-buffer parameters).',
    source: 'Genuine gap — several candidate models (A–E) remain open.',
  },
  {
    id: 'u3',
    confidence: 'unknown',
    claim: 'Order type used for automated execution (market vs. limit) and tick-by-tick vs. polling-interval evaluation basis.',
    source: 'Not disclosed.',
  },
  {
    id: 'u4',
    confidence: 'unknown',
    claim: 'Position sizing logic — how much EUR/BTC per trade.',
    source: 'Not disclosed.',
  },
]
