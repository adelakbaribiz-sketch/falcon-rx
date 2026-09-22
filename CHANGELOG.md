# Changelog

## Unreleased

### Added
- Phase 1 research corpus: sources, confirmed facts, inferred hypotheses, unknowns, contradictions,
  source matrix (`research/`).
- Independent MQL5 EA draft implementing the baseline state machine (`src/mt5/FalconLikeEA.mq5`),
  with ASSUMED sections explicitly marked and MT5-vs-Bitvavo differences documented.
- Research & Strategy dashboard (`dashboard/`): Overview, Research, Strategy Parameters, Backtest
  Demo (synthetic, labeled), and Documentation pages. React + TypeScript + Tailwind v4, client-only.
- Unit tests for the trigger-price math, state machine data integrity, and the synthetic backtest
  generator's determinism/invariants (`dashboard/src/data/__tests__/`).
- Full documentation set (`docs/`), `RESEARCH_STATUS.md` phase tracker, `.env.example`,
  `.gitignore`, `LICENSE`.

### Known gaps
See `docs/LIMITATIONS.md` and `docs/ROADMAP.md`.
