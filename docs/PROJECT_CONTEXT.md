# Project Context

## What this is

FALCON-RX is an independent research project studying a publicly-documented behavioral pattern
in retail crypto trading bots — specifically a "micro mean-reversion" style (buy a small dip,
wait for confirmation, sell a small rally, never force a loss) — and building an independently
implemented, independently named engine inspired by that public behavior.

The research trigger was FalconTrader (BLCKMGIC GmbH), a commercial German BTC/EUR trading bot for
Bitvavo. This project does not use, request, or claim access to that product's proprietary source
code, internal algorithm, or trade secrets. Everything treated as fact here comes from that
vendor's own public marketing site and help documentation, cited by URL and access date in
`/research`.

## Why this classification

Per the project's own classification scheme this is a **Hybrid: Research Project + Trading/
Financial System**, not a SaaS/AI product. There is no end user signing up for a service — the
deliverable is (a) a research corpus with confidence-graded findings, (b) a formal independent
strategy specification and state machine, (c) a dashboard that visualizes both, and (d) an early
MT5 port of the state machine. It is explicitly **not yet** a working automated trading system —
see `LIMITATIONS.md`.

## Current stage

**Research / Prototype.** Phase 1 (source research) is checkpointed. No historical market data has
been acquired, no backtest has been run against real data, and no live or paper trading is wired
up. See `RESEARCH_STATUS.md` at the repo root for the live phase tracker.
