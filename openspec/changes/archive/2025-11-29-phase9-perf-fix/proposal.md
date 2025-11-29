# Change: Phase 9 - Performance Fix (Modal Timeouts)

## Why
The user reported a 60-second delay between "Page loaded" and "Filter button found".
This is caused by the scraper waiting the default Playwright timeout (30s) for **each** of the two optional modals ("Close" and "Decline cookies") when they are NOT present. 30s + 30s = 60s.

## What Changes
- **Modal Handling:** Instead of blindly calling `.click()` (which waits 30s), we will:
    1.  Check `.isVisible()` first (instant).
    2.  Or use `.click(new Locator.ClickOptions().setTimeout(2000))` to give it a brief chance to appear but fail fast.
- **Scroll Loop:** Reduce the `waitForTimeout(1000)` to `500ms` or use a smarter wait to speed up the scrolling phase, as requested.

## Impact
- **Affected Code:** `src/main/java/.../service/FbScraperService.java`
- **Performance:** Startup time reduced by ~60 seconds. Scroll loop speed doubled.
