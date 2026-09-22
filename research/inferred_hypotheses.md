# Inferred Hypotheses

These are NOT vendor-confirmed. They are this project's own hypotheses to be tested against
market data in later phases (Part 5–8, 23–25 of the working spec). None of these should be
presented to an end user as "how FalconTrader works" — only as "how FALCON-RX's independent model
works, inspired by the publicly confirmed behavioral constraints."

---

**HYPOTHESIS H1 — Reference price is a short-period moving average of last-trade price**
**BASIS:** Vendor marketing copy on falcontrader.de refers to "the moving average and smallest
fluctuations" as the basis for entry timing ("Aus dem gleitenden Durchschnitt und kleinsten
Kursschwankungen ergibt sich, wann ein Einstieg lohnt").
**CONFIDENCE:** MEDIUM-CONFIDENCE INFERENCE — confirms *a* moving average is used as reference,
but not type, period, or price basis (last/mid/bid/ask).

---

**HYPOTHESIS H2 — Sell threshold (0.55%) is a fee+edge-aware minimum, buy threshold (0.32%) is not
fee-adjusted**
**BASIS:** Vendor directly ties the 0.55% sell default to ~0.5% round-trip fees (confirmed fact
above). No equivalent fee statement was found for the 0.32% buy threshold, which is a pure "how far
must price fall" trigger, not a cost-recovery figure.
**CONFIDENCE:** MEDIUM-CONFIDENCE INFERENCE.

---

**HYPOTHESIS H3 — Trailing behavior on both sides uses a simple fixed-percentage trailing-stop-style
formula (Model A / B from the working spec), not volatility-adjusted trailing**
**BASIS:** No mention of ATR, volatility, or "adaptive" language anywhere in vendor copy found so
far; parameters are presented as flat percentages with fixed ranges, consistent with a simple
percent-trailing implementation aimed at non-technical retail users ("no programming knowledge or
trading experience" required).
**CONFIDENCE:** MEDIUM-CONFIDENCE INFERENCE — absence of "adaptive" marketing language is weak but
consistent evidence; vendors targeting non-technical users tend not to hide a much more
sophisticated model behind simple sliders, but this is not proof.

---

**HYPOTHESIS H4 — "Micro-fluctuations of 0.1–0.4%" marketing language describes the *typical*
observed move size the bot trades on, not a hard parameter**
**BASIS:** This phrase appeared only in aggregated search-snippet marketing copy (S9), not in the
technical docs (S5/S6), where the actual documented range is 0.05–5.00% and default 0.32%/0.55%.
**CONFIDENCE:** LOW-CONFIDENCE HYPOTHESIS — this is marketing copy, explicitly NOT to be converted
into a technical fact per project rules. It is roughly consistent with the documented defaults
(0.32% buy, 0.55% sell both fall in the "0.1-0.4%-ish" range the marketing gestures at) but should
not be used as a numeric input anywhere in the implementation.
