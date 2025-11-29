## 1. Setup
- [ ] 1.1 Clean up old static files (`rm src/main/resources/static/*`).
- [ ] 1.2 Initialize React project:
    - [ ] Create `frontend/` directory using Vite (React + JavaScript).
    - [ ] Install dependencies (`axios` for API, `bootstrap`).
- [ ] 1.3 Configure Proxy:
    - [ ] Set up `vite.config.js` to proxy `/fb` requests to `http://localhost:8080`.

## 2. Implementation
- [ ] 2.1 Create Components:
    - [ ] `Header.jsx`
    - [ ] `ScraperSection.jsx` (Input + Scrape Button)
    - [ ] `LotterySection.jsx` (Settings + Draw Button)
    - [ ] `ParticipantsTable.jsx`
    - [ ] `WinnersList.jsx`
- [ ] 2.2 Implement App Logic (`App.jsx`):
    - [ ] Manage state (participants, winners, loading, error).
    - [ ] Integrate API calls.
- [ ] 2.3 Styling:
    - [ ] Import Bootstrap.

## 3. Build Integration
- [ ] 3.1 Build the React app.
- [ ] 3.2 Copy build artifacts (`frontend/dist/*`) to `src/main/resources/static/`.
