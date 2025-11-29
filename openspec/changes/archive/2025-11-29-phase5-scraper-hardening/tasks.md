## 1. Implementation
- [x] 1.1 Modify `FbScraperService.java`:
    - [x] **Step 1:** Switch Filter. Look for "Most relevant" dropdown, click it, select "All comments".
    - [x] **Step 2:** Improve "View more" clicker. Use `getByText("View more comments", new Page.GetByTextOptions().setExact(false))` or Regex.
    - [x] **Step 3:** Increase `maxIterations` to 500 (safe upper bound).
    - [x] **Step 4:** Increase `noChangeCount` tolerance to 5.
    - [x] **Step 5:** Add `page.waitForLoadState(LoadState.NETWORKIDLE)` after clicks (with timeout safety).
