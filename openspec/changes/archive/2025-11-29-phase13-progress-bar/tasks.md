## 1. Backend (Progress Tracking)
- [x] 1.1 Create `ScraperProgress` singleton/component:
    - [x] Fields: `status` (IDLE, SCRAPING, COMPLETED), `count` (int).
- [x] 1.2 Update `FbScraperService`:
    - [x] Inject `ScraperProgress`.
    - [x] Update `count` inside the scraping loop.
    - [x] Reset on start.
- [x] 1.3 Update `ScraperController`:
    - [x] Add `GET /fb/progress` returning the current count/status.

## 2. Frontend (Polling)
- [x] 2.1 Update `ScraperInput.jsx`:
    - [x] Add `setInterval` when loading starts.
    - [x] Poll `/fb/progress`.
    - [x] Display: "Processing... (Found X comments)".
- [ ] 2.2 Update `App.jsx`: Ensure state is managed cleanly.

## 3. Build
- [x] 3.1 Build and Deploy.
