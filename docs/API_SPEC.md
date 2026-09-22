# API Specification

**STATUS: NOT IMPLEMENTED.** There is no backend and no API in this repository today. This
document specifies the *planned* interface boundary for the future execution/data engine (Phase
9–12 of the original research plan), written now so the eventual implementation has a target
rather than being designed ad hoc later.

## Planned `ExecutionEngine` interface

```
interface ExecutionEngine {
  placeBuy(clientOrderId: string, quantity: number, priceHint?: number): Promise<OrderResult>
  placeSell(clientOrderId: string, quantity: number, priceHint?: number): Promise<OrderResult>
  getOrderStatus(orderId: string): Promise<OrderStatus>
  cancelOrder(orderId: string): Promise<void>
  reconcile(): Promise<PositionSnapshot>
}
```

Three implementations are planned, none built yet:

- `PaperExecutionEngine` — simulates fills against live market data, no real orders.
- `BacktestExecutionEngine` — simulates fills against historical data with configurable slippage/
  fee models.
- `BitvavoExecutionEngine` — real orders via the Bitvavo REST/WebSocket API, gated behind
  `ENABLE_LIVE_TRADING=true` (see `docs/SECURITY.md`).

Idempotent client order IDs, duplicate-order detection, reconnect handling, and restart-state
reconciliation are required for the Bitvavo implementation before it may be used with real funds —
none of this exists yet.

## Planned data endpoints (internal, not public-facing)

`GET /api/state` — current state machine snapshot (state, reference price, dip/peak trackers).
`GET /api/research` — the research corpus, so the dashboard can read from a live-editable source
instead of the bundled static TypeScript data it uses today.
`GET /api/backtest/:runId` — a real backtest result, once real data exists.

None of these routes exist. The dashboard currently reads everything from bundled static data.
