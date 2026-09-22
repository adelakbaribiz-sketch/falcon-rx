# Deployment

## Dashboard (current scope)

The dashboard is a static Vite build with no backend dependency, so it can be deployed to any
static host (Netlify, Vercel, GitHub Pages, S3+CloudFront, etc.):

```bash
cd dashboard
npm run build
# deploy dashboard/dist/ to your static host of choice
```

No environment variables are required for the build or the deployed app — everything it shows is
bundled at build time. **No deployment of this dashboard has actually been performed as part of
this project** — this section documents how to, not a confirmation that it's live anywhere.

## MQL5 EA

Not a deployment target in the usual sense. To use `src/mt5/FalconLikeEA.mq5`:

1. Copy it into your MetaTrader 5 `MQL5/Experts/` directory.
2. Compile in MetaEditor.
3. Attach to a chart on a **demo account only** until it has been tested — it has not been
   backtested or forward-tested against any real data as of this writing (see
   `docs/LIMITATIONS.md`).

## Future backend (not built)

Once Phase 12 (paper trading) begins, the original plan's Docker/Docker Compose + Postgres/Redis
stack becomes relevant (see the phase tracker in `RESEARCH_STATUS.md`). No Docker configuration
exists yet because there is no service to containerize.
