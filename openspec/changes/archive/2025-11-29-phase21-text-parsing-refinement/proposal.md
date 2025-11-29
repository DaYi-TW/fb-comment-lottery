# Change: Phase 21 - Text Parsing Refinement (No aria-label)

## Why
The user states: "author and content are not using ariaLabel, use article.innerText".
The previous strategy heavily relied on `aria-label="Comment by X"`. If Facebook has changed this or it's not reliable for the user's locale/version, we must fall back to parsing the raw text structure.

## What Changes
- **Strategy:**
    - **Step 1:** Get `article.innerText()`.
        - Typical format: `AuthorName\nTimestamp\nCommentContent...` or `AuthorName\nCommentContent...`
    - **Step 2:** Identify the Author.
        - It is almost always the **first line** of the text (or the text of the first bold link).
        - We will extract the first non-empty line as the Author.
    - **Step 3:** Identify Content.
        - Everything *after* the author (and potentially after the timestamp line) is content.
    - **Step 4 (Fix Regex):** Also fix the compilation error from the previous turn (`\^`).

## Impact
- **Affected Code:** `FbScraperService.java`.
- **Robustness:** Less dependent on hidden accessibility labels, more dependent on visual layout (text order).

