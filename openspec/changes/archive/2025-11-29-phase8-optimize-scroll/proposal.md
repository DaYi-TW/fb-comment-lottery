# Change: Phase 8 - Optimize Scrolling & Remove Debug

## Why
The user identified issues with the current scraper:
1.  **Wrong Scroll Target:** There are two scrollbars (likely a modal/dialog overlay), and the global window scroll isn't affecting the comment list.
2.  **Too Slow:** The hardcoded wait times (2-3s) are too long.
3.  **Cleanup:** Screenshots are no longer needed.

## What Changes
- **Scrolling Strategy:** Instead of scrolling the `window`, we will:
    - Identify if a `[role="dialog"]` or `[role="main"]` exists.
    - Use `.scrollIntoViewIfNeeded()` on the **last loaded comment** to force the container to scroll.
    - Fallback: Try scrolling the specific element `[role="dialog"]` via JS.
- **Performance:** Reduce `waitForTimeout` calls to 1000ms (1 second).
- **Cleanup:** Remove all `page.screenshot(...)` calls.

## Impact
- **Affected Code:** `src/main/java/.../service/FbScraperService.java`
- **Performance:** Scraping should be significantly faster.
