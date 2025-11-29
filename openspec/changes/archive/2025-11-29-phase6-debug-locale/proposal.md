# Change: Phase 6 - Debug & Localization

## Why
The scraper is failing to load all comments (stuck at 10) despite previous fixes. This is likely due to:
1.  **Locale Mismatch:** The headless browser may be rendering in Traditional Chinese (zh-TW) based on the user's system, causing English text selectors ("Most relevant", "All comments") to fail.
2.  **Visibility:** Headless mode makes it impossible to see if a "Login Wall" or "Captcha" is blocking the view.

## What Changes
- **Localization:** Update `FbScraperService` to support Chinese keywords (e.g., "最相關", "所有留言", "查看更多留言") in addition to English.
- **Visibility:**
    - Set `headless = false` by default (or configurable) so the user can watch the browser and verify if interactions are blocked.
    - Add **Screenshot Debugging**: Save screenshots to `target/screenshots/` at key milestones (Loaded, Filter Clicked, Scrolling).

## Impact
- **Affected Code:** `src/main/java/.../service/FbScraperService.java`
- **User Experience:** A browser window will now pop up during scraping.
