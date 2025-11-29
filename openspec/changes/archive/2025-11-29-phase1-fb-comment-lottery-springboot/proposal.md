# Change: Phase 1 - Core Lottery Logic

## Why
To implement the foundational "Lottery" capability described in the project proposal (Section 4.2). This allows the system to pick winners from a list of data, independent of the source (scraped or manual).

## What Changes
- Implement `LotteryService` with filtering logic (deduplication, keyword matching).
- Implement `LotteryController` with `POST /fb/lottery`.
- Define `FbComment` and `Winner` models.
- Note: This phase focuses on the *Logic*. The *Scraper* (Playwright) will be added in Phase 2.

## Impact
- **Affected Specs:** `lottery`
- **New API:** `POST /fb/lottery`
- **New Models:** `FbComment`, `Winner`