# Change: Phase 4 - React.js Frontend

## Why
To upgrade the user interface to a modern, component-based architecture using **React.js**. This improves maintainability, state management, and user experience compared to the vanilla HTML/JS solution.

## What Changes
- **New Directory:** `frontend/` (Root-level React project).
- **Tech Stack:** React 18, Vite, Bootstrap 5 (react-bootstrap or raw CSS).
- **Cleanup:** Remove the vanilla JS files from Phase 3 (`src/main/resources/static/*`).
- **Development Workflow:**
    - **Dev:** React Dev Server (Port 5173) -> Proxy -> Spring Boot (Port 8080).
    - **Prod:** React Build -> `src/main/resources/static`.

## Impact
- **Affected Specs:** `ui` (Implementation details change to React)
- **Affected Code:**
    - `frontend/**` (New)
    - `src/main/resources/static/` (Cleared and replaced by build artifacts)
