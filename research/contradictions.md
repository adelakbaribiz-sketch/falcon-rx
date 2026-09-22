# Contradictions / Verification Flags

No outright contradictions found between sources this pass — the EN and DE help docs and the
marketing site are numerically consistent with each other (0.32% buy / 0.55% sell / 0.70% trailing
steps / 0.03% floor buffers appear the same everywhere they appear).

Flags for follow-up rather than true contradictions:

1. **Marketing "0.1–0.4% micro-fluctuations" vs. documented defaults (0.32% / 0.55%)** — not a
   contradiction (0.32% and, loosely, 0.55% are near that marketing range), but the marketing
   phrase is vaguer than and not sourced from the technical docs. Treat the technical docs (S5/S6)
   as authoritative over aggregated marketing snippets (S9) if they ever diverge more sharply.
2. **Company registration details (address, HRB number)** — currently sourced only from a search
   engine's summary of the Impressum page rather than a direct fetch of falcontrader.de/impressum.
   Should be independently verified (or dropped from any external-facing doc) before being treated
   as fact — flagged in unknowns.md item 9.
3. **AGB / Datenschutz pages not yet reviewed** — could not yet confirm whether they add or
   conflict with anything in the help docs (e.g. around order types, data retention, liability for
   losses). No conflict is currently known; this is an open coverage gap, not a detected
   contradiction.
