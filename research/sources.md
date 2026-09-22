# Sources

All entries retrieved 2026-09-22 via web search + page fetch tooling. Page fetches were processed
by an intermediate summarization step (not raw HTML review), so exact wording quoted below should
be treated as high-fidelity paraphrase, not a verified verbatim quote, unless noted otherwise.
Two independent fetches of the English help page were compared and agreed on all numeric values.

| ID | URL | Type | Language | Notes |
|---|---|---|---|---|
| S1 | https://falcontrader.de/ | Vendor marketing site | DE/EN | Product overview, claims list |
| S2 | https://falcontrader.de/agb | Vendor T&Cs | DE | Not yet fetched in full |
| S3 | https://falcontrader.de/impressum | Vendor legal notice | DE | Company registration info (seen via search snippet only, not directly fetched) |
| S4 | https://falcontrader.de/datenschutz | Vendor privacy policy | DE | Not yet fetched |
| S5 | https://docs.falcontrader.de/en.html | Vendor help docs | EN | Primary source for parameter table (buy/sell/trailing/floor/limit) |
| S6 | https://docs.falcontrader.de/de.html | Vendor help docs | DE | Corroborates buy 0.32% / sell 0.55% defaults; adds fee rationale for sell threshold |
| S7 | Google Play listing (com.callforwarding.falcontrader) | App store listing | EN | Found via search, not fetched for content |
| S8 | ScamAdviser page for falcontrader.de | Third-party trust rating | EN | Trust score 76 ("probably legit"); not a technical source |
| S9 | Web search snippets (multiple) | Aggregated marketing copy | DE/EN | Source of "micro-fluctuations 0.1–0.4%" marketing claim |

## Gaps / not yet searched

- French, Dutch, Spanish, Italian queries not yet run (spec requested all six languages).
- No Trustpilot page specific to FalconTrader found (search returned unrelated bots: "Falcon
  Funded", "bitcoin-bot.app").
- No Reddit or independent forum discussion of FalconTrader found in English search.
- No GitHub repositories found referencing FalconTrader/BLCKMGIC internals.
- AGB (terms) and Datenschutz (privacy) pages not yet fetched — may contain additional disclosure
  about execution/data handling worth checking in Phase 2.
