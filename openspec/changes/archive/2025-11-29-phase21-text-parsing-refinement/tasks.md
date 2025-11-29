## 1. Backend Update
- [x] 1.1 Update `FbScraperService.java`:
    - [x] **Fix Compilation Error:** Remove the invalid `\^` at the end of the regex.
    - [x] **Refactor Parsing Logic:**
        - Get `String fullText = article.innerText()`.
        - Split by newline `\n`.
        - **Author:** Assume `lines[0]` is the author.
        - **Content:** Join `lines[1..end]`.
        - **Refinement:** If `lines[1]` matches a timestamp pattern (e.g. "2d", "Yesterday"), skip it and start content from `lines[2]`.

## 2. Build
- [x] 2.1 Build and Deploy.
