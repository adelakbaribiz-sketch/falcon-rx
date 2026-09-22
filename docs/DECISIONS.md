# Decisions

Engineering decisions made to fill gaps in the original brief, per the "fill reasonable gaps,
mark assumptions, don't fabricate" instruction. Each entry: what was decided, why, and how to
revisit it.

## D1 — Dashboard is client-only, no backend

**Decision:** Build the research/strategy dashboard as a static client-side app with no server.
**Why:** Nothing in the project yet has real, multi-writer, or persisted state that would justify
a backend (see `docs/ARCHITECTURE.md`). Building one now would mean serving fabricated data behind
a real-looking API, which is worse than being upfront that it's static.
**Revisit when:** a paper-trading loop exists (Phase 12) and the dashboard needs to show live
state rather than a point-in-time snapshot.

## D2 — Trailing-trigger formula = "Model B" (floor-clamped)

**Decision:** All three implementations (dashboard demo, MQL5 EA, this spec) use
`max(floor, dip_low * (1 + step))` rather than the unclamped Model A or a volatility-adjusted
model.
**Why:** It is the simplest model consistent with the *documented purpose* of the floor-buffer
parameter ("prevents the trailing trigger from never firing on shallow dips/peaks") without adding
undisclosed complexity (volatility adjustment) that no public source suggests.
**Revisit when:** Phase 6 hypothesis testing runs Models A/C/D/E against real data and one out-
performs Model B out-of-sample, or converges to it.

## D3 — Reference price = SMA(20) of last trade price

**Decision:** Default the reference engine to a 20-period simple moving average.
**Why:** Arbitrary but disclosed as arbitrary — 20 is a common default period, "last trade price"
is the simplest available basis, and SMA is the simplest MA family. None of this is claimed to
match the researched product.
**Revisit when:** Phase 6 hypothesis testing.

## D4 — License: proprietary / all-rights-reserved, repo private

**Decision:** No OSS license; repository created as private.
**Why:** This project's core content is competitive research about a named third party. Even
though the research methodology is legitimate (public-source only, confidence-graded, no trade
secrets), publishing it openly by default is a decision the repository owner should make
deliberately, not one this pass should make for them.
**Revisit when:** the owner decides whether/how to make any of this public.

## D5 — No fabricated backtest results

**Decision:** The only "backtest" in this repository runs against a synthetic random-walk price
series, generated in-browser, labeled `SIMULATED` in every place it appears (UI badges, headings,
body text, code comments, this doc).
**Why:** No real historical data has been acquired (Phase 4 is not started). Any numeric
performance claim without real data would be fabricated evidence, which the brief explicitly
prohibits.
**Revisit when:** Phase 4–5 complete and a real backtest exists — at that point the demo page
should be relabeled or replaced, not left implying it's still just a demo.
