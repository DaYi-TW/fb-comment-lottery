# Change: Phase 14 - Async Architecture for Stability

## Why
The current implementation keeps the HTTP connection open while scraping (`GET /fb/comments`). For large posts, this takes >60 seconds, causing:
1.  **Browser Timeouts:** The request fails before data returns.
2.  **Server Errors:** `HttpMessageNotWritableException` (Connection aborted) when the server finally tries to write the response to a closed connection.

## What Changes
- **Architecture:** Move from **Synchronous Blocking** to **Asynchronous Polling**.
- **Backend:**
    - `ScraperController.scrapeComments` will now return `202 Accepted` immediately and start the scraper in a background thread.
    - `ScraperProgress` (singleton) will store the *results* (List of Comments) once finished.
    - New Endpoint `GET /fb/results` to fetch the data after completion.
- **Frontend:**
    - **Step 1:** Trigger Scrape (returns instantly).
    - **Step 2:** Poll `/fb/progress` (already doing this, but now we check for 'COMPLETED').
    - **Step 3:** When 'COMPLETED', fetch `/fb/results` to populate the table.

## Impact
- **Affected Code:** `FbScraperService.java`, `ScraperController.java`, `ScraperProgress.java`, `ScraperInput.jsx`.
- **Reliability:** Eliminates HTTP timeouts for long scrapes.
