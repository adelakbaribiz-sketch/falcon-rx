# Security Review

Reviewed 2026-09-22, scope: everything in this repository (research docs, `dashboard/`,
`src/mt5/FalconLikeEA.mq5`). No backend exists yet, which substantially limits the current attack
surface — most of this review documents what to re-check once one is built, not vulnerabilities
found today.

## Secrets

- Checked: no API keys, passwords, or tokens found committed anywhere in the tree (grepped for
  common `key/secret/password/token = "..."` patterns outside `node_modules`). **PASSED.**
- `.env.example` contains only empty placeholders; `.gitignore` excludes `.env*` except the example
  file. **PASSED.**
- `src/mt5/FalconLikeEA.mq5` takes no credentials — MT5 account auth is handled by the terminal
  itself, outside this codebase. **N/A.**

## Authentication / Authorization

**NOT APPLICABLE YET** — there is no backend, no login, and no user accounts. This section must be
revisited before any backend is built (Phase 12+); revisit `docs/API_SPEC.md`'s planned endpoints
at that time.

## Input validation / XSS / Injection

- The dashboard renders only its own bundled static data — no field anywhere accepts external or
  user-supplied text that gets rendered as HTML. Checked: no `dangerouslySetInnerHTML`, no
  `innerHTML` assignment, no `eval()` anywhere in `dashboard/src`. **PASSED.**
- React's default JSX escaping covers the one genuinely dynamic input (the Strategy page's number
  inputs), and those values are only ever used in arithmetic, never rendered as markup. **PASSED.**
- No SQL/NoSQL/shell injection surface exists — no database, no server, no shell-out from the
  frontend. **N/A.**

## File upload

Not implemented anywhere. **N/A.**

## API exposure

No API exists. When Phase 12's execution engine is built, `docs/API_SPEC.md` already specifies
that live trading must be gated behind `ENABLE_LIVE_TRADING=true` and that Bitvavo API keys must be
scoped to View + Trade only, never Withdraw — carried over from the confirmed FalconTrader
behavior and independently a sound default.

## Sensitive data

No PII, financial account data, or trading history is collected, stored, or transmitted by
anything in this repository today.

## Dependency risk

`npm audit` could not reach the npm registry from this development sandbox (network restricted) —
this was attempted, not skipped, and failed with a socket-level connection error, not a clean
result. **ACTION FOR THE REPO OWNER:** run `npm audit` (or `npm audit --omit=dev`) inside
`dashboard/` from a machine with normal network access before treating dependencies as reviewed.
Dependencies used (`react`, `react-router-dom`, `recharts`, `tailwindcss`, `vite`) are all
mainstream, actively maintained packages with no currently-known-to-me critical advisories, but
that claim has not been machine-verified in this environment.

## MQL5 EA — additional notes specific to that file

- `NormalizeLots` clamps to the symbol's min/max/step but does **not** validate the requested lot
  size against account equity or a configured risk percentage. Before any live use,
  `InpFixedLots` must be sized deliberately by the operator — this EA does not protect against a
  fat-fingered oversized position. Documented here rather than silently assumed safe.
- The EA never requests withdrawal-capable permissions (MT5 EAs cannot request account-level
  permissions the way an API key can — this is inherent to the platform, not a design choice of
  this EA).
- `InpEnableOptionalSafetyStop` defaults to `false`, preserving the confirmed baseline behavior (no
  forced loss-selling). Flipping it on is an explicit, documented deviation from baseline — see
  the inline comment at its declaration.

## Summary

No exploitable vulnerabilities found in the current, backend-less codebase. The meaningful security
work (auth, API exposure, credential handling, execution-engine hardening per
`docs/API_SPEC.md`'s idempotency/reconciliation requirements) has not started because the systems
it would protect don't exist yet — tracked in `RESEARCH_STATUS.md`, not glossed over here.
