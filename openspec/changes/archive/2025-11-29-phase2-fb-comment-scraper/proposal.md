# Change: Phase 2 - Facebook Comment Scraper

## Why
To enable the system to automatically fetch comments from public Facebook posts. This connects the Lottery Engine (Phase 1) with real-world data, removing the need for manual input.

## What Changes
- **Dependency:** Add `playwright` (Java version) to `pom.xml`.
- **Service:** Implement `FbScraperService` using Playwright to:
    - Launch a headless Chromium instance.
    - Navigate to the target Facebook post.
    - Automatically scroll to load comments.
    - Parse comment author and content using **ARIA roles and text structure** (not brittle CSS classes).
- **Controller:** Create `ScraperController` to expose `GET /fb/comments`.

## Impact
- **Affected Specs:** `scraper` (New Capability)
- **Affected Code:**
    - `pom.xml` (New dependency)
    - `src/main/java/.../service/FbScraperService.java`
    - `src/main/java/.../controller/ScraperController.java`
