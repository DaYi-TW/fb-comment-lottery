# Change: Phase 15 - Multi-User Session Support

## Why
The user asked: "If multiple users use this, will it distinguish them?"
Currently: **NO**. The `ScraperProgress` is a **Singleton** (`@Component`).
If User A starts a scrape, and User B starts a scrape:
1.  User A's job is overwritten or mixed with User B's.
2.  User B sees User A's progress count.
3.  User A gets User B's results.

## What Changes
- **Session Management:** We need to track progress *per request*.
- **Backend:**
    - Introduce a `jobId` (UUID) returned when scraping starts.
    - Change `ScraperProgress` from a Singleton to a **Map<String, JobStatus>** manager.
    - `GET /fb/progress?jobId=...`
    - `GET /fb/results?jobId=...`
- **Frontend:**
    - Store the `jobId` from the start response.
    - Use that `jobId` for polling and fetching results.

## Impact
- **Affected Code:** `ScraperProgress.java`, `FbScraperService.java`, `ScraperController.java`, `ScraperInput.jsx`.
- **Scalability:** Supports concurrent users (until server RAM runs out).
