## 1. Backend Updates
- [x] 1.1 Update `ScraperProgress.java`:
    - [x] Add `private List<FbComment> results`.
    - [x] Add `getResults()` / `setResults()`.
    - [x] Ensure thread safety (use `synchronized` or `CopyOnWriteArrayList` if writing incrementally, but simple set at end is fine).
- [x] 1.2 Update `FbScraperService.java`:
    - [x] Change `scrapeComments` return type to `void`.
    - [x] Run the scraping logic in a `new Thread(() -> { ... }).start()` or use `@Async`.
    - [x] On completion, save comments to `progress.setResults(comments)` and `progress.complete()`.
    - [x] Handle exceptions by setting status to `ERROR`.
- [x] 1.3 Update `ScraperController.java`:
    - [x] `GET /fb/comments`: Returns `ResponseEntity.accepted().build()`. Starts service.
    - [x] `GET /fb/results`: Returns `progress.getResults()`.

## 2. Frontend Updates
- [x] 2.1 Update `ScraperInput.jsx`:
    - [x] `handleScrape`:
        - Call `/fb/comments`.
        - Start Polling.
        - Inside Poll: If `status === 'COMPLETED'`, call `/fb/results`, update parent, stop polling.
        - If `status === 'ERROR'`, show error.

## 3. Build
- [x] 3.1 Build and Deploy.
