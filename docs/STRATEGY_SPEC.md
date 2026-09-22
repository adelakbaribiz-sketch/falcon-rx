# Strategy Specification

This is the canonical definition every implementation (dashboard demo, MQL5 EA, future Python
backtest engine) must match. Where a value is CONFIRMED it is sourced from public vendor
documentation (see `research/confirmed_facts.md`); where a formula is ASSUMED it is this project's
own placeholder pending hypothesis testing against real data (see `research/unknowns.md`).

## Market / instrument

- Primary target: BTC/EUR (Bitvavo). MT5 port targets whatever BTC-denominated instrument the
  connected broker offers, which will differ in execution characteristics — see the header comment
  in `src/mt5/FalconLikeEA.mq5`.

## Parameters (CONFIRMED defaults)

| Parameter | Default | Range |
|---|---|---|
| `buy_percent` | 0.32% | 0.05–5.00% |
| `trailing_buy_step` | 0.70% | 0.05–5.00% |
| `trailing_buy_floor_buffer` | 0.03% | 0–1.00% |
| `sell_percent` | 0.55% | 0.05–5.00% |
| `trailing_sell_step` | 0.70% | 0.05–5.00% |
| `trailing_sell_floor_buffer` | 0.03% | 0–1.00% |
| `limit_price_offset` | 0% | −20% to +20% |

## State machine (independent model)

States: `FLAT` → `TRACKING_DIP` → `LONG` → `TRACKING_PEAK` → `FLAT` (cycle), with an `ERROR`
(safety stop) state reachable from either tracking state on an execution failure.

```
FLAT           price <= reference * (1 - buy_percent)        -> TRACKING_DIP
TRACKING_DIP   price >= trailing buy trigger                 -> LONG (buy fills)
LONG           price >= entry * (1 + sell_percent)            -> TRACKING_PEAK
TRACKING_PEAK  price <= trailing sell trigger                 -> FLAT (sell fills)
```

No state has an automatic loss-triggered exit in the baseline. A position opened in `LONG` can
remain open indefinitely below entry price — this is a confirmed behavioral property, not a
limitation of this implementation (see `research/confirmed_facts.md`, fact `c7`).

## Trigger formulas (ASSUMED — Model B)

```
buy_threshold      = reference * (1 - buy_percent)
buy_floor          = buy_threshold * (1 + trailing_buy_floor_buffer)
trailing_buy_trigger  = max(buy_floor, dip_low * (1 + trailing_buy_step))

sell_threshold      = entry_price * (1 + sell_percent)
sell_floor          = sell_threshold * (1 + trailing_sell_floor_buffer)
trailing_sell_trigger = max(sell_floor, peak_high * (1 - trailing_sell_step))
```

This is one of several candidate models consistent with the publicly documented parameter *names*
and their stated *purpose* ("prevents the trailing trigger from never firing on shallow
dips/peaks"). It is not claimed to be the proprietary formula. Phase 6 of the original research
plan exists specifically to test this and competing models (A, C, D, E) against real market data.

## Reference price (ASSUMED)

Simple moving average, period and price-basis configurable, default period 20 of last-trade price.
Vendor copy confirms *a* moving average is used as the reference mark but does not disclose type,
period, or price basis (last trade vs. mid vs. bid/ask) — see `research/unknowns.md`, `u1`.

## Position sizing / risk (baseline)

One position at a time. No averaging down, no martingale, no grid. No forced stop-loss in the
baseline (matches confirmed vendor behavior). An optional, explicitly non-baseline safety-stop
module exists in the MQL5 EA, off by default, for future experimentation — see
`docs/DECISIONS.md`.
