# User Flows

All flows below are for the dashboard demo (`dashboard/`), which is the only interactive surface
that exists today. There is no account system, no login, and no multi-step onboarding — the
project has no end users to onboard yet.

## Flow 1 — Understand the project's current state (Overview)

1. Land on `/`.
2. See status badge ("Research / Prototype"), confirmed-fact count, and open-unknown count at a
   glance.
3. Click through the state machine diagram to read each state's description and outgoing
   transitions.
4. See the confirmed baseline parameters.

## Flow 2 — Audit a research claim (Research)

1. Navigate to `/research`.
2. Switch between Confirmed / Inferred / Unknown tabs.
3. Read each claim with its source citation inline — no claim appears without one.

## Flow 3 — Explore strategy sensitivity (Strategy Parameters)

1. Navigate to `/strategy`.
2. Adjust a sample reference price and any of the seven parameter sliders.
3. See buy/sell threshold, floor, and trailing-trigger prices recompute live.
4. Nothing here is persisted or sent anywhere — it resets on reload by design (no backend to save
   to yet).

## Flow 4 — Inspect the (simulated) backtest demo

1. Navigate to `/backtest`.
2. Default view: a synthetic-data run through the state machine, clearly labeled `SIMULATED`
   throughout, with stats, a price/reference chart, and an equity curve.
3. Use "Re-roll synthetic seed" to see a different synthetic sequence — demonstrates the state
   machine holds up across arbitrary input, not just one cherry-picked run.
4. Use the "UI state demo" toggle to see Loading / Error / Empty states — included so a reviewer
   can see these states without needing a real failure to occur.

## Flow 5 — Find the underlying documentation (Documentation)

1. Navigate to `/docs`.
2. See a linked index of every markdown doc in the repository, with a one-line description of
   each, so a reviewer knows where to go for depth the dashboard doesn't cover.
