# Change: Phase 18 - Fix Timestamp Hover Selector

## Why
The user clarified that the timestamp is **ONLY available inside a dynamically generated tooltip div upon hover**, not in the `aria-label` of the link itself.
My previous attempt looked for `[role="tooltip"]` generally, but Facebook's tooltip implementation is tricky. We need to target the specific `div` that appears after hovering the relative time link.

## What Changes
- **Scraper Logic:**
    1.  Locate the relative time link (e.g., "2w").
    2.  Hover it.
    3.  **Wait specifically** for a new element with `role="tooltip"` (or a generic `div` with high z-index/absolute positioning if roles are missing) to attach to the DOM.
    4.  Extract the text from that new element.

## Impact
- **Affected Code:** `FbScraperService.java`.
- **Accuracy:** Enables getting precise timestamps even when hidden behind "2w".
