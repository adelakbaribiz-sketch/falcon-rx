# Testing

Run 2026-09-22, `dashboard/` only — the only code in this repository with an automated test setup.
`src/mt5/FalconLikeEA.mq5` has no test harness (MQL5 has no equivalent in this project yet); see
`docs/LIMITATIONS.md`.

## Commands

```bash
cd dashboard
npm run build    # tsc -b && vite build
npm run lint      # oxlint
npm run test      # vitest run
```

## PASSED

- `npm run build` — clean, no TypeScript errors. (One informational bundle-size warning from
  Vite about the ~650KB recharts-inclusive bundle — not an error, noted in `docs/LIMITATIONS.md`.)
- `npm run lint` — clean, zero oxlint findings.
- `npm run test` — 14/14 tests passing across 3 files:
  - `strategyParams.test.ts` (6 tests) — buy/sell threshold arithmetic, floor-clamp behavior,
    trailing-trigger monotonicity outside the clamp region.
  - `stateMachine.test.ts` (4 tests) — every transition references a real state, the FLAT→
    TRACKING_DIP and TRACKING_PEAK→FLAT edges exist, no duplicate state ids.
  - `demoBacktest.test.ts` (4 tests) — synthetic simulation is deterministic per seed, differs
    across seeds, never records a trade that exits below its entry price (baseline "no forced
    loss-selling" invariant), and produces exactly the requested tick count.
- Manual verification in the browser preview this session: all five routes navigate correctly,
  Strategy page sliders recompute thresholds live, Backtest Demo's four UI-state toggles (success/
  loading/error/empty) render correctly, no console errors on any page, responsive layout checked
  at 375px (mobile), ~700px, and 1440px widths, dark mode checked via `prefers-color-scheme`
  emulation.

## FIXED

- One test (`strategyParams.test.ts`, "trailing trigger rises with a deeper dip") initially failed
  — not because of an implementation bug, but because both of its sample dip values fell inside
  the floor-clamped region of the formula, so no difference could be observed. Fixed by choosing
  dip values outside that region and adding a comment explaining why. See the git history for this
  file.
- Removed two unused dependencies (`postcss`, `autoprefixer`) left over from an initial Tailwind
  setup attempt before switching to the `@tailwindcss/vite` plugin, which needs neither.

## REMAINING

- No automated end-to-end/browser test suite (e.g. Playwright) — this session's browser
  verification was manual, not codified into a repeatable test.
- No test coverage for `src/mt5/FalconLikeEA.mq5` — it has not been compiled or run at all, on a
  demo account or otherwise.
- `npm audit` could not run in this environment (see `docs/SECURITY.md`) — dependency
  vulnerability scanning is an open item for the repo owner.
- No accessibility audit tool (e.g. axe) was run — only manual checks (contrast via the chosen
  palette, keyboard-navigable nav links/buttons by virtue of being real `<a>`/`<button>` elements).
