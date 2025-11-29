# Change: Phase 16 - Timestamp Extraction

## Why
The user explicitly requested extracting the full timestamp (`yyyy/mm/dd hh:mm:ss`) instead of the relative time ("2週") seen on the UI. This requires interacting with the timestamp element (hover or attribute reading).

## What Changes
- **Model:** Update `FbComment` to include `timestamp` field.
- **Scraper:**
    - Locate the relative time link (e.g., "2w").
    - Strategy A: Read `aria-label` (usually contains full date).
    - Strategy B (Fallback): `hover()` the link and read the tooltip.
- **Frontend:** Display the timestamp in the Results table.

## Impact
- **Affected Code:** `FbComment.java`, `FbScraperService.java`, `ParticipantsTable.jsx`.
- **Performance:** Scraping might be slightly slower if hover is required, but `aria-label` is instant.
