# Architecture

## Current components (built)

```
falcon-rx/
├── research/              Phase 1 research corpus (sources, confirmed/inferred/unknown facts)
├── src/mt5/                Independent MQL5 EA — state machine port for MetaTrader 5
│   └── FalconLikeEA.mq5
└── dashboard/               React + TypeScript + Tailwind, client-only demo app
    └── src/
        ├── data/            Strategy math, state machine definition, research findings,
        │                    and the synthetic backtest generator — all pure functions/data,
        │                    no network calls
        ├── components/      Layout shell, shared UI primitives (Badge/Card/States), the
        │                    state-machine diagram
        └── pages/           Overview, Research, Strategy Parameters, Backtest Demo, Docs
```

The dashboard has **no backend**. Every page is statically computed in the browser from local
TypeScript data modules. This is a deliberate choice (see `docs/DECISIONS.md`): there is nothing
real for a backend to serve yet — no ingested market data, no persisted research corpus editable
by multiple people, no live account to proxy. Building one now would be scaffolding around an
empty room.

## Planned components (not built — see `RESEARCH_STATUS.md` phase tracker)

The original project specification (still tracked internally) describes a much larger system:
market-data engine, backtest engine, execution engine, risk engine, Postgres/Redis/Docker
deployment, and a paper-trading loop. None of that exists yet. When Phase 4+ begins, the natural
seam is:

- `data/` and `strategy/` — Python modules implementing the same math currently duplicated in
  `dashboard/src/data/strategyParams.ts` and the MQL5 EA. All three implementations (TypeScript
  demo, MQL5, future Python) should converge on one spec document (`docs/STRATEGY_SPEC.md`) so
  they don't silently drift.
- A real backend only becomes necessary once there is a paper-trading loop to expose over a
  WebSocket/API to the dashboard (Phase 12). Until then the dashboard stays backend-less by design.

## Why three parallel implementations of the same trigger math exist

`dashboard/src/data/strategyParams.ts` (TypeScript, for the demo UI), `src/mt5/FalconLikeEA.mq5`
(MQL5, for MetaTrader), and the eventual Python backtest engine are intentionally kept as separate,
readable implementations rather than one shared library, because they run in three different
runtimes with no practical way to share code between them. `docs/STRATEGY_SPEC.md` is the single
source of truth they must each match; discrepancies between them are bugs.
