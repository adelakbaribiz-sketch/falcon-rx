# Demo

## Running the dashboard locally

```bash
cd dashboard
npm install
npm run dev
```

Opens at `http://localhost:5173`. No environment variables, API keys, or backend are required —
it is fully static.

## What to look at

1. **Overview** (`/`) — project status, confirmed-parameter summary, interactive state machine.
2. **Research** (`/research`) — confirmed / inferred / unknown findings, each with a source.
3. **Strategy Parameters** (`/strategy`) — live threshold math against the confirmed defaults.
4. **Backtest Demo** (`/backtest`) — synthetic run through the state machine (labeled
   `SIMULATED` throughout) plus a UI-state toggle (success/loading/error/empty) for reviewing
   those states without needing a real failure.
5. **Documentation** (`/docs`) — index into the markdown docs in this repository.

## What is real vs. demo/simulated on this dashboard, explicitly

| Element | Status |
|---|---|
| Confirmed-fact list, sources | REAL (transcribed from actual vendor documentation, see `research/`) |
| Parameter defaults (0.32%, 0.55%, etc.) | REAL (vendor-confirmed public defaults) |
| State machine diagram/transitions | REAL (this project's own independent design) |
| Threshold/trigger price math on `/strategy` | REAL arithmetic, applied to an ASSUMED (not vendor-confirmed) trigger formula |
| Price series, equity curve, trade count on `/backtest` | SIMULATED (synthetic random walk, seeded, in-browser) |
| Everything else (login, accounts, real orders, live prices) | NOT IMPLEMENTED |

## Building for production

```bash
cd dashboard
npm run build
```

Outputs static files to `dashboard/dist/` — deployable to any static host (see
`docs/DEPLOYMENT.md`).
