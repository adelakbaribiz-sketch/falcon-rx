# Product Requirements

## Users of this project

1. **The researcher/engineer (primary)** — needs a place to accumulate confidence-graded findings
   without letting marketing claims calcify into "facts," and a way to see how those findings
   translate into a concrete, testable strategy specification.
2. **A portfolio/technical reviewer (secondary)** — needs to understand, in minutes, what is real,
   what is simulated, and what stage the project is at, without reading source code.
3. **A future contributor (tertiary)** — needs the assumptions log (`RESEARCH_STATUS.md`,
   `research/inferred_hypotheses.md`) to know which parts of the strategy logic are placeholders
   for hypothesis testing, not settled design.

## Functional requirements (current scope)

| # | Requirement | Status |
|---|---|---|
| 1 | Record research findings with source + confidence grading | IMPLEMENTED (`research/*.md`, mirrored in dashboard `/research`) |
| 2 | Define an independent state machine for the strategy | IMPLEMENTED (`dashboard/src/data/stateMachine.ts`, `src/mt5/FalconLikeEA.mq5`) |
| 3 | Let a viewer manipulate strategy parameters and see resulting trigger prices | IMPLEMENTED (`/strategy` page, client-side only) |
| 4 | Demonstrate the state machine against a price series, clearly labeled synthetic | IMPLEMENTED (`/backtest` page, `demoBacktest.ts`) |
| 5 | Ingest real historical BTC/EUR data | NOT IMPLEMENTED — blocked on data source selection |
| 6 | Run a real backtest against real data | NOT IMPLEMENTED — depends on #5 |
| 7 | Paper-trade against live market data | NOT IMPLEMENTED |
| 8 | Execute live trades on Bitvavo | NOT IMPLEMENTED, and out of scope for this agent to ever execute directly — see `docs/SECURITY.md` |

## Non-functional requirements

- No fabricated performance numbers anywhere in the repo or dashboard — every simulated figure is
  labeled `SIMULATED`/`DEMO` in the UI and in text.
- No real credentials committed (`.env.example` only, see `.gitignore`).
- Dashboard must build, lint, and render correctly responsive from ~375px to desktop widths, light
  and dark.
