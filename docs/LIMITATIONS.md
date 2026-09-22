# Limitations

Stated plainly, so nobody mistakes this for further along than it is.

## Research limitations

- Research covered English and German sources only. French, Dutch, Spanish, and Italian searches
  (requested in the original scope) have not been run.
- No third-party teardown, user forum discussion, or independent review of the researched product
  was found — the research corpus is built entirely from that vendor's own marketing site and
  help documentation. There is no independent corroboration beyond the vendor's own two documents
  agreeing with each other.
- The company registration details in early research notes (address, HRB number) were sourced from
  a search-engine summary of the Impressum page, not a direct fetch — flagged, not verified.

## Strategy/implementation limitations

- The reference-price model (which moving average, what period, what price basis) and the exact
  trailing-trigger formula are **assumed**, not confirmed — see `docs/DECISIONS.md` D2/D3. Every
  number derived from them (in the dashboard's Strategy page, in the MQL5 EA) inherits that
  uncertainty.
- No real historical BTC/EUR data has been acquired. Nothing in this repository has been validated
  against real market behavior.
- The MQL5 EA (`src/mt5/FalconLikeEA.mq5`) has not been compiled, backtested, or forward-tested on
  even a demo account. Treat it as a first draft implementing the state machine, not a validated
  trading tool.
- Position sizing, multi-instrument support, and fee-model accuracy for MT5/CFD brokers are not
  implemented — the EA uses a fixed lot size input only.

## Dashboard limitations

- No backend — nothing is persisted, shared between viewers, or fetched live. Every reload resets
  the Strategy page's slider state.
- The backtest demo uses synthetic, in-browser-generated data. It is not a real backtest and must
  never be quoted as a performance result (see `docs/DEMO.md`'s real-vs-simulated table).
- No automated end-to-end/browser tests exist, only unit tests on the pure logic modules (see
  `docs/TESTING.md`). Manual verification was done for responsive layout, dark mode, and the four
  pages' primary flows in this session; it was not automated, so it will not catch future
  regressions on its own.
- Bundle size warning at build time (recharts pulls in ~650KB minified/195KB gzipped) — acceptable
  for a demo, would be worth code-splitting if this became a real product.

## What this project is not

It is not a live trading system, not a validated strategy, not a claim about how the researched
third-party product actually works internally, and not a finished product of any kind. It is a
research corpus, a specification, a demo dashboard, and a first-draft EA — stages one and a half
into a fourteen-phase plan.
