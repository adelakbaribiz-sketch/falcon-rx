# Source Matrix

| Claim | S1 (marketing) | S5 (EN docs) | S6 (DE docs) | S9 (search snippets) |
|---|---|---|---|---|
| buy_percent default 0.32% | — | ✓ | ✓ | ~ (implied, not exact) |
| sell_percent default 0.55% | — | ✓ | ✓ | ~ (implied, not exact) |
| trailing_buy_step default 0.70% | — | ✓ | — (mentioned, value not independently re-confirmed) | — |
| trailing_sell_step default 0.70% | — | ✓ | — (mentioned, value not independently re-confirmed) | — |
| floor buffers default 0.03% | — | ✓ | — | — |
| limit_price_offset default 0% | — | ✓ | — | — |
| sell threshold is fee-aware (~0.5% fees) | — | — | ✓ | — |
| never sells below purchase price | ✓ | — | ✓ | ✓ |
| moving average used as reference (type/period undisclosed) | ✓ (qualitative mention) | — | — | — |
| API key scoped View+Trade, never Withdraw | ✓ | — | ✓ | — |
| "micro-fluctuations 0.1–0.4%" | — | — | — | ✓ (marketing only) |

Legend: ✓ = directly stated in this source; ~ = loosely consistent but not an exact independent
confirmation; — = not addressed by this source.

Two-source-minimum rule for "CONFIRMED" status (per project rule to avoid overclaiming): every
row above marked CONFIRMED in confirmed_facts.md has at least one direct vendor-technical-doc
source (S5 and/or S6), which is treated as authoritative for parameter values since it is the
vendor's own documentation rather than third-party paraphrase.
