# Change: Phase 19 - Fix Comment Parsing Logic

## Why
The user reported a parsing error:
```json
{ "author": "2天", "content": "李香陳...", "timestamp": null }
```
The scraper incorrectly identified the timestamp ("2天") as the author, and left the real author ("李香陳") inside the content. This happens because the scraper naively picks the `.first()` link as the author, which in some layouts might be the timestamp or the logic fails to separate them.

## What Changes
- **Author Extraction:**
    - **Primary:** Extract author directly from `aria-label` (e.g., "Comment by X" or "X 留言"). This is the most reliable source.
    - **Secondary (DOM):** If using links, filter out links that look like timestamps (digits + d/w/y/天/週).
- **Content Extraction:**
    - Remove the Author Name from the `innerText` more carefully (only from the start).
- **Timestamp:** Ensure "2天" is captured as `timestamp` if hover fails or as a fallback.

## Impact
- **Affected Code:** `FbScraperService.java`.
- **Result:** Correct mapping of Author vs Content vs Timestamp.
