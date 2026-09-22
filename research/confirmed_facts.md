# Confirmed Facts

Format: SOURCE | DATE | CLAIM | CONFIDENCE

---

**SOURCE:** S5 (docs.falcontrader.de/en.html), cross-checked twice
**DATE:** accessed 2026-09-22
**CLAIM:** Public parameter table:
- `buy_percent`: range 0.05–5.00%, default **0.32%** — "how far the price must drop below the
  reference mark before the bot buys."
- `trailing_buy_step`: range 0.05–5.00%, default **0.70%** — bot waits for a bounce of this much
  from the deepest dip rather than buying immediately at threshold.
- `trailing_buy_floor_buffer`: range 0–1.00%, default **0.03%** — "safety buffer above the buy
  threshold. Prevents the trailing trigger from never firing on shallow dips."
- `sell_percent`: range 0.05–5.00%, default **0.55%** — how far above the user's own buy price the
  market must move before the bot sells.
- `trailing_step` (sell): range 0.05–5.00%, default **0.70%** — bot lets profits run and sells when
  price drops this much from the high, rather than selling immediately at threshold.
- `trailing_floor_buffer` (sell): range 0–1.00%, default **0.03%** — safety buffer above the sell
  threshold, same rationale as the buy-side floor.
- `limit_price_offset`: range −20% to +20%, default **0%** — "shifts the upper market ceiling above
  which the bot stops buying."
**CONFIDENCE:** CONFIRMED (vendor's own technical documentation; internally consistent across two
independent fetches; consistent with the parameter values already known going into this research)

---

**SOURCE:** S6 (docs.falcontrader.de/de.html)
**DATE:** accessed 2026-09-22
**CLAIM:** The 0.55% sell threshold default is explicitly described as "accounting for ~0.5%
exchange fees" — i.e. the vendor states the sell-side threshold is fee-aware by design, not an
arbitrary number.
**CONFIDENCE:** CONFIRMED (direct vendor statement). This directly informs Part 23 hypothesis #7
(fee structure) and Part 12 Module 7 (fee awareness) in the project spec — the vendor itself
confirms fee-awareness is at least part of the sell-threshold's design intent.

---

**SOURCE:** S1 (falcontrader.de), S6
**DATE:** accessed 2026-09-22
**CLAIM:** The bot never automatically sells below the user's own purchase price ("der Bot verkauft
nie automatisch unter deinem Einkaufspreis"). No forced stop-loss. Position can remain open and
underwater for an extended period while waiting for price recovery above entry.
**CONFIDENCE:** CONFIRMED (stated in both marketing and help docs, consistent with each other).

---

**SOURCE:** S1, S6
**DATE:** accessed 2026-09-22
**CLAIM:** Execution model: the user's own Bitvavo account is used directly; the FalconTrader API
key is scoped to "View information" + "Trade" permissions only, explicitly never "Withdraw funds."
The vendor states the app itself cannot withdraw funds.
**CONFIDENCE:** CONFIRMED.

---

**SOURCE:** S6
**DATE:** accessed 2026-09-22
**CLAIM:** Observed UI/status states (partial, not exhaustive): "Waiting for buy opportunity", "Buy
order placed", "Sell mode." These are user-facing status-pill labels, not necessarily 1:1 with an
internal state machine, but they are evidence of at least a FLAT/watching state, an order-pending
state, and a post-buy/sell-mode state.
**CONFIDENCE:** CONFIRMED as UI labels; MEDIUM-CONFIDENCE INFERENCE as a mapping to internal states.

---

**SOURCE:** S5, S6 (absence of disclosure)
**DATE:** accessed 2026-09-22
**CLAIM:** The vendor does **not** publicly disclose: the moving-average type or period used for
the "reference mark," whether the reference/threshold is computed against last trade price, mid
price, best bid, or best ask, or the order type (market vs. limit) used for automated buy/sell
execution.
**CONFIDENCE:** CONFIRMED ABSENCE OF DISCLOSURE (i.e. these are genuinely unknown from public
sources, not merely unfound by this search pass) — see unknowns.md.
