// Independent behavioral state machine (this project's own model, informed by — but not claimed
// to be identical to — the publicly described behavior of the third-party product researched in
// /falcon-rx/research). See RESEARCH_STATUS.md.

export interface StateDef {
  id: string
  label: string
  description: string
}

export const states: StateDef[] = [
  { id: 'FLAT', label: 'Flat / Watching', description: 'No position. Watching price against the reference mark.' },
  { id: 'TRACKING_DIP', label: 'Tracking Dip', description: 'Buy threshold breached. Tracking the deepest observed dip while waiting for a rebound.' },
  { id: 'LONG', label: 'Long / Sell Mode', description: 'Holding a position. Watching for price to rise above entry by the sell threshold. No forced stop-loss.' },
  { id: 'TRACKING_PEAK', label: 'Tracking Peak', description: 'Sell threshold breached. Tracking the highest observed peak while waiting for a pullback.' },
  { id: 'ERROR', label: 'Safety Stop', description: 'Execution failure or reconciliation mismatch. Manual intervention required.' },
]

export interface TransitionDef {
  from: string
  to: string
  condition: string
}

export const transitions: TransitionDef[] = [
  { from: 'FLAT', to: 'TRACKING_DIP', condition: 'price ≤ reference × (1 − buy_percent)' },
  { from: 'TRACKING_DIP', to: 'TRACKING_DIP', condition: 'price makes a new low (dip_low updates)' },
  { from: 'TRACKING_DIP', to: 'LONG', condition: 'price ≥ trailing buy trigger → BUY fills' },
  { from: 'LONG', to: 'TRACKING_PEAK', condition: 'price ≥ entry × (1 + sell_percent)' },
  { from: 'TRACKING_PEAK', to: 'TRACKING_PEAK', condition: 'price makes a new high (peak_high updates)' },
  { from: 'TRACKING_PEAK', to: 'FLAT', condition: 'price ≤ trailing sell trigger → SELL fills' },
  { from: 'TRACKING_DIP', to: 'ERROR', condition: 'buy order execution fails' },
  { from: 'TRACKING_PEAK', to: 'ERROR', condition: 'sell order execution fails' },
]
