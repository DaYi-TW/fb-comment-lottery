## 1. Backend Updates
- [x] 1.1 Refactor `ScraperProgress.java`:
    - [x] Rename to `JobManager`.
    - [x] Maintain a `ConcurrentHashMap<String, JobStatus>` (jobId -> status).
    - [x] Methods: `createJob()`, `updateJob(id, count)`, `completeJob(id, results)`, `getJob(id)`.
    - [x] Implement simple cleanup (remove jobs older than 1 hour).
- [x] 1.2 Update `FbScraperService.java`:
    - [x] `scrapeCommentsAsync` now accepts `jobId`.
    - [x] Updates `JobManager` using `jobId`.
- [x] 1.3 Update `ScraperController.java`:
    - [x] `GET /fb/comments` -> Generates UUID, starts service, returns `{"jobId": "..."}`.
    - [x] `GET /fb/progress` -> Accepts `jobId`.
    - [x] `GET /fb/results` -> Accepts `jobId`.

## 2. Frontend Updates
- [x] 2.1 Update `App.jsx`:
    - [x] Store `currentJobId` in state.
    - [x] When starting scrape, save the ID.
    - [x] Pass ID to `ScraperInput` for polling.
- [x] 2.2 Update `ScraperInput.jsx`:
    - [x] Poll `/fb/progress?jobId=${jobId}`.

## 3. Build
- [x] 3.1 Build and Deploy.
