# Data Model

**STATUS: NOT IMPLEMENTED as a database.** No database exists in this project. What follows is the
planned schema (matching the original research plan's Part 36), documented ahead of
implementation so later work has a fixed target — not a description of anything running today.

## Planned tables

| Table | Purpose |
|---|---|
| `market_ticks` | raw tick/trade stream, once a WebSocket ingestion pipeline exists |
| `market_quotes` | best bid/ask snapshots |
| `strategy_runs` | one row per backtest/paper/live run, with parameter set + git commit + dataset hash for reproducibility |
| `strategy_parameters` | versioned parameter sets (the seven confirmed params + any future adaptive-module config) |
| `signals` | every state-machine transition, with the full context that produced it (matches the log format in `docs/DEMO.md`) |
| `orders` / `fills` | execution records |
| `positions` / `trades` | derived from orders/fills |
| `equity_snapshots` | for equity-curve reconstruction |
| `backtest_results` / `walkforward_results` | aggregated metrics per run |
| `risk_events` | safety-stop triggers, reconciliation mismatches |

## What exists today instead

The dashboard's "data layer" is three static TypeScript modules
(`dashboard/src/data/{researchFindings,strategyParams,stateMachine,demoBacktest}.ts`) — plain
in-memory objects and pure functions, not a database. This is intentional at the current stage:
there is no real, multi-writer, persisted state yet that would justify one.
