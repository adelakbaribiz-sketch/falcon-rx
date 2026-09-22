# RESEARCH_STATUS.md — FALCON-RX

Project: independent, publicly-inspired research + implementation of a Bitvavo BTC/EUR
mean-reversion trading engine, behaviorally informed by FalconTrader's public documentation.
Not affiliated with, and does not use any proprietary source/trade-secret material from,
BLCKMGIC GmbH.

Last updated: 2026-09-22 (Phase 1 checkpointed; Phase 2–3 drafted; portfolio productization pass complete)

## PHASE STATUS

| Phase | Status |
|---|---|
| 1. Research and source extraction | Checkpointed — see gaps in Blockers below |
| 2. Public behavioral specification | Done — `docs/STRATEGY_SPEC.md` |
| 3. Baseline state machine | Done (independent model) — `dashboard/src/data/stateMachine.ts`, `src/mt5/FalconLikeEA.mq5` |
| 4. Historical data ingestion | NOT STARTED — no data source selected yet |
| 5. Simple baseline backtest | NOT STARTED (dashboard has a SIMULATED synthetic-data demo only, not a real backtest) |
| 6+ | NOT STARTED |
| — Portfolio productization pass (docs, dashboard, security review, tests, GitHub repo) | Done this session |

## COMPLETED THIS SESSION (research pass)

- Web research on FalconTrader / BLCKMGIC GmbH (English, German queries; French/Dutch/Spanish/Italian not yet run).
- Fetched `falcontrader.de` marketing page and `docs.falcontrader.de` (EN + DE help docs).
- Extracted and independently cross-checked the public strategy parameter table (two separate
  fetches of the English help doc agreed; German help doc corroborated the buy/sell defaults).
- Wrote `research/sources.md`, `research/confirmed_facts.md`, `research/inferred_hypotheses.md`,
  `research/unknowns.md`, `research/contradictions.md`, `research/source_matrix.md`.

## COMPLETED THIS SESSION (productization pass)

- Formalized `docs/STRATEGY_SPEC.md` and the independent state machine (Phase 2–3).
- Built `dashboard/` — React/TS/Tailwind v4 research & strategy dashboard, client-only, no
  fabricated data (see `docs/DEMO.md` for the real-vs-simulated breakdown per element).
- Added unit tests (14/14 passing — `docs/TESTING.md`) covering the trigger-price math, state
  machine data integrity, and the synthetic backtest generator's invariants; one test bug found
  and fixed during this pass (see `docs/TESTING.md`, FIXED section).
- Wrote the full `docs/` set, `README.md` (with Business Overview, Portfolio Case Study, Honest
  Status), `CHANGELOG.md`, `CONTRIBUTING.md`, `.gitignore`, `.env.example`, `LICENSE`,
  `.github/workflows/ci.yml`, issue templates.
- Ran a security review (`docs/SECURITY.md`) — no secrets found, no backend attack surface yet;
  `npm audit` blocked by sandboxed network access, disclosed rather than skipped.
- `git init` + local commit history; GitHub repo created and pushed (see repo README/commit log
  for current state — do not assume this status doc's snapshot stays current).

## CONFIRMED (see research/confirmed_facts.md for sourcing)

- Company: BLCKMGIC GmbH (Germany), product: FalconTrader, mobile app trading BTC/EUR via user's
  own Bitvavo account (API key with View + Trade only, never Withdraw).
- Public default parameters: buy_percent 0.32%, trailing_buy_step 0.70%,
  trailing_buy_floor_buffer 0.03%, sell_percent 0.55%, trailing_sell_step 0.70%,
  trailing_sell_floor_buffer 0.03%, limit_price_offset 0%. Ranges are documented (roughly
  0.05–5.00% for the threshold/step parameters).
- Sell threshold default is explicitly stated by the vendor to account for ~0.5% round-trip
  exchange fees.
- No forced stop-loss: bot claims to never sell below the user's own purchase price automatically.
- No disclosed moving-average type, period, or reference-price definition (last trade / mid /
  bid / ask) — vendor explicitly does not publish this.
- No disclosed order type (market vs limit) for automated buy/sell execution.

## INFERRED / UNKNOWN

See `research/inferred_hypotheses.md` and `research/unknowns.md`. Headline unknowns: reference
price construction, moving-average family/period, trailing-buy/sell trigger formula (which of
Models A–E in the task spec), execution order type, and tick vs candle basis for triggers.

## ASSUMED

Now baked into code (dashboard demo + MQL5 EA), each marked inline and in `docs/DECISIONS.md`:
- Reference price = SMA(20) of last trade price (D3).
- Trailing trigger = "Model B": `max(floor, dip_low * (1 + step))` (D2).
- Market-order execution, one position at a time, no stop-loss in baseline.
None of these are claimed to match the researched product — see `docs/DECISIONS.md` for the
reasoning and the revisit condition (Phase 6 hypothesis testing) for each.

## BLOCKERS

- No historical BTC-EUR tick/trade-level data source selected yet (user confirmed no existing
  dataset). Free-tier Bitvavo REST gives candle (OHLCV) data, not tick-level — this is a real
  limitation for Part 15 (tick-level backtesting) that must be disclosed, not worked around silently.
- No Bitvavo API key available yet (not needed until Phase 12+).
- Did not find user reviews, forum threads, or third-party teardown of the bot's internals in
  English/German search — reverse engineering the reference price and trailing formulas will have
  to rely on hypothesis testing against market data (Phase 6), not additional public disclosure.
- Did not yet search French/Dutch/Spanish/Italian sources (spec requested this) or attempt to
  independently verify the BLCKMGIC GmbH Impressum details (address/HRB number) via a direct fetch
  rather than a search-engine summary — flagged in contradictions.md as needing verification.

## NEXT STEP

Phase 4: select and acquire a real BTC/EUR historical dataset. Everything from Phase 5 onward
(real backtest, hypothesis testing between competing reference-price/trailing-trigger models,
walk-forward validation) is blocked on this one step — see `docs/ROADMAP.md`.
