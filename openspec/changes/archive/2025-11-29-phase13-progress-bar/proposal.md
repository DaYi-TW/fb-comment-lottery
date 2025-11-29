# Change: Phase 13 - Real-Time Scraper Progress

## Why
The user asked: "when scraping comment front can see the progress??"
Currently, the UI just shows a spinning "Processing..." state. The backend logs progress ("Found 50 comments..."), but the frontend is blind until the request finishes.

## What Changes
- **Backend:**
    - Introduce a **Progress API** (SSE - Server Sent Events, or a simple Polling mechanism).
    - Update `FbScraperService` to publish events or update a thread-safe `ProgressTracker`.
    - New Endpoint: `GET /fb/progress`.
- **Frontend:**
    - When `Scrape` starts, start polling `/fb/progress` (or listen to SSE).
    - Update the "Scrape" button or a new Progress Bar with: "Found X comments...".

## Implementation Strategy (Simple Polling for now)
1.  **Singleton `JobStatus`:** Store the current scraping count in a static/singleton bean.
2.  **Update Service:** `FbScraperService` updates this bean inside the loop.
3.  **Poll:** Frontend polls every 1s.

## Impact
- **Affected Code:** `FbScraperService.java`, `ScraperController.java`, `ScraperInput.jsx`.
- **UX:** User sees numbers climbing (e.g., "Scraped 150 comments...").
