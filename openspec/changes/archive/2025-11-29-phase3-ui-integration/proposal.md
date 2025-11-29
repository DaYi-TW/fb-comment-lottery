# Change: Phase 3 - Simple Web UI

## Why
To provide a user-friendly interface for users to interact with the Scraper and Lottery system without using CLI tools like curl or Postman.

## What Changes
- **Frontend Tech:** HTML + Vanilla JavaScript (or simple Thymeleaf) served by Spring Boot.
- **Features:**
    - Input field for Facebook Post URL.
    - "Scrape" button to fetch comments (displays loading state).
    - Table to display scraped comments (Author, Content).
    - "Draw Winner" section (Count input, Filter input, "Draw" button).
    - Display of Winners.
- **Backend:**
    - Ensure `ScraperController` and `LotteryController` support CORS (if frontend is separate, but we will serve static files for simplicity).

## Impact
- **Affected Specs:** `ui` (New Capability)
- **Affected Code:**
    - `src/main/resources/static/index.html`
    - `src/main/resources/static/app.js`
    - `src/main/resources/static/styles.css`
