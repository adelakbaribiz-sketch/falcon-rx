# Roadmap

Tracks the same phases as `RESEARCH_STATUS.md` at the repo root, in one place for a portfolio
reader. Status reflects 2026-09-22.

| Phase | What it is | Status | Unblocked by |
|---|---|---|---|
| 1. Research & source extraction | Confirmed/inferred/unknown facts about the publicly documented behavior being studied | Checkpointed | — |
| 2. Formal public specification | `docs/STRATEGY_SPEC.md` | Done | Phase 1 |
| 3. Baseline state machine | `dashboard/src/data/stateMachine.ts`, `src/mt5/FalconLikeEA.mq5` | Done (independent model, not vendor-verified) | Phase 2 |
| 4. Historical data ingestion | Real BTC/EUR tick or OHLCV data | Not started | Choosing/acquiring a data source (free-tier Bitvavo REST gives OHLCV, not tick-level) |
| 5. Baseline backtest (real data) | Python backtest engine | Not started | Phase 4 |
| 6. Hypothesis testing for unknowns | Test competing reference-price / trailing-trigger models against real data | Not started | Phase 4–5 |
| 7. Walk-forward validation | | Not started | Phase 5–6 |
| 8. Robustness / parameter perturbation | | Not started | Phase 5–6 |
| 9–11. Microstructure, adaptive strategy, risk engine | | Not started | Phase 6–8 |
| 12. Paper trading | Requires a live market-data feed and the `ExecutionEngine` abstraction in `docs/API_SPEC.md` | Not started | Phase 4, 9 |
| 13. MT5 hardening | `src/mt5/FalconLikeEA.mq5` exists as a first draft; needs demo-account testing, not yet done | Draft only | Broker demo account access |
| 14. Production deployment | | Not started | Everything above |

## What's realistically next

Phase 4 (data acquisition) is the actual unblock for almost everything else. Until real BTC/EUR
data exists, Phases 5–12 stay theoretical regardless of how much more UI or documentation gets
built around them — this roadmap deliberately does not let later phases get ahead of that
dependency.
