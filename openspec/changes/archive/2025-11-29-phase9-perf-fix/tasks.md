## 1. Implementation
- [x] 1.1 Modify `FbScraperService.java`:
    - [x] **Fix Modals:** Change modal closing logic to use `.isVisible()` check or `setTimeout(2000)`.
    - [x] **Speed Up Loop:** Reduce `page.waitForTimeout(1000)` to `page.waitForTimeout(500)`.
    - [x] **Disable View More:** If the user says there isn't one, we keep the check (it doesn't hurt if using `isVisible`), but ensure it doesn't block.
