# Contributing

This is currently a single-maintainer private research project, not one actively seeking outside
contributors. These guidelines exist so the repo is in reasonable shape if that changes.

## Ground rules

- **No fabricated data.** Any new research claim needs a source and date
  (`research/sources.md` format). Any simulated/demo data added to the dashboard must be labeled
  as such in the UI, not just in a code comment.
- **Assumptions get marked, not hidden.** If you implement something the public sources don't
  confirm, mark it `ASSUMED` inline, explain why in `docs/DECISIONS.md`, and make it configurable
  where practical (see `docs/STRATEGY_SPEC.md`'s existing pattern).
- **Keep the three strategy implementations (dashboard TS, MQL5, future Python) in sync** with
  `docs/STRATEGY_SPEC.md`. If you change the trigger formula in one, update the spec and the others
  or explain the divergence.

## Working on the dashboard

```bash
cd dashboard
npm install
npm run dev
npm run lint
npm run test
npm run build
```

All four should pass before opening a PR. CI runs the same checks (`.github/workflows/ci.yml`).
