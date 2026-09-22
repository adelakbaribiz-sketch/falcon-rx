# Unknowns

Explicitly unresolved by public sources as of 2026-09-22. These map directly onto the hypothesis
tests required in Parts 4–8 of the working spec — they are not gaps to "fill in" from imagination,
they are the actual research questions Phase 6 (hypothesis testing) exists to narrow down using
market data, not further web search.

1. **Reference price construction** — SMA/EMA/WMA/VWMA/other; period (tick count, seconds, or
   trade count); price basis (last trade, mid, best bid, best ask, or a microprice blend).
2. **Trailing-buy trigger formula** — exact relationship between `dip_low`, `trailing_buy_step`,
   and `trailing_buy_floor_buffer` (candidate Models A–E in the working spec are all consistent
   with the parameter *names* disclosed, but the docs do not give the formula).
3. **Trailing-sell trigger formula** — same ambiguity, mirrored on the sell side.
4. **Order type for automated execution** — market or limit; if limit, how `limit_price_offset`
   interacts with it beyond "shifts the upper market ceiling above which the bot stops buying."
5. **Tick vs. interval basis** — whether triggers are evaluated on every tick/trade update, on a
   fixed polling interval, or on candle close.
6. **Position sizing logic** — not mentioned in anything fetched so far (how much EUR/BTC per
   trade, whether it's 100% of allocated capital or a fraction).
7. **Multi-bot / multi-instance behavior** — site mentions "bot cards" (plural) in the dashboard;
   unclear whether multiple concurrent positions per user are supported or it's strictly one
   position at a time (spec's baseline assumption).
8. **Historical performance** — no vendor-published backtest, audited track record, or third-party
   performance analysis found. "No fixed return promises" per vendor's own language.
9. **BLCKMGIC GmbH company details (address, HRB number)** — seen only via a search-engine summary
   of the Impressum page, not a direct fetch/verification. Should be verified directly before being
   cited anywhere as fact.
