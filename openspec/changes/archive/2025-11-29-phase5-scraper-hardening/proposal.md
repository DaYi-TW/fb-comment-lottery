# Change: Phase 5 - Scraper Hardening

## Why
The current scraper implementation fails to load all comments for posts with large volumes (e.g., 1000+). It gets stuck after loading the initial batch (approx. 10). This is likely due to:
1.  Default "Most Relevant" filter hiding comments.
2.  "View more" button having dynamic text (e.g., "View 50 more comments").
3.  Insufficient waiting/retrying for network loads.

## What Changes
- **Filter Selection:** Automatically attempt to switch the comment filter from "Most relevant" to "All comments".
- **Button Logic:** Use regex/substring matching to find "View more" buttons (e.g., `View .* comments`).
- **Retry Strategy:** Increase the `noChangeCount` threshold and add explicit waits for network idle states if possible.
- **Headless Mode:** Keep `headless=true` but ensure user-agent is set to avoid bot detection (basic measure).

## Impact
- **Affected Specs:** `scraper` (Modified Requirement: Deep Scraping)
- **Affected Code:** `src/main/java/.../service/FbScraperService.java`
