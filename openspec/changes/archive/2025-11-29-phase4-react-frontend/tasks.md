## 1. Setup
- [x] 1.1 Clean up old static files (`rm src/main/resources/static/*`).
- [x] 1.2 Initialize React project:
    - [x] Create `frontend/` directory using Vite (React + JavaScript).
    - [x] Install dependencies (`axios` for API, `bootstrap`).
- [x] 1.3 Configure Proxy:
    - [x] Set up `vite.config.js` to proxy `/fb` requests to `http://localhost:8080`.

## 2. Implementation
- [x] 2.1 Create Components:
    - [x] `Header.jsx`
    - [x] `ScraperSection.jsx` (Input + Scrape Button)
    - [x] `LotterySection.jsx` (Settings + Draw Button)
    - [x] `ParticipantsTable.jsx`
    - [x] `WinnersList.jsx`
- [x] 2.2 Implement App Logic (`App.jsx`):
    - [x] Manage state (participants, winners, loading, error).
    - [x] Integrate API calls.
- [x] 2.3 Styling:
    - [x] Import Bootstrap.

## 3. Build Integration
- [x] 3.1 Build the React app.
- [x] 3.2 Copy build artifacts (`frontend/dist/*`) to `src/main/resources/static/`.
