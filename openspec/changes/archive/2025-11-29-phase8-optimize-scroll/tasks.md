## 1. Implementation
- [x] 1.1 Modify `FbScraperService.java`:
    - [x] **Remove** all `page.screenshot` blocks.
    - [x] **Reduce Timeouts:** Change `3000` -> `1000`, `2000` -> `1000`.
    - [x] **Fix Scrolling:**
        - Replace `window.scrollTo` with:
            1.  Find the last comment: `commentArticles.last()`.
            2.  Call `lastComment.scrollIntoViewIfNeeded()`.
            3.  (Backup) Check for `[role="dialog"]` and evaluate JS `el.scrollTop = el.scrollHeight`.
