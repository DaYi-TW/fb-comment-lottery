## 1. Implementation
- [x] 1.1 Modify `FbScraperService.java`:
    - [x] **Config:** Change `headless` to `false` (allow user to see).
    - [x] **Selectors:** Add Regex for Chinese keywords:
        - Filter: `Pattern.compile("Most relevant|Top comments|最相關|熱門", ...)`
        - Option: `Pattern.compile("All comments|所有留言", ...)`
        - Button: `Pattern.compile("View.*comments|查看.*留言|更多留言", ...)`
    - [x] **Debug:** Add `page.screenshot(...)` calls after navigation and after filter switching.
