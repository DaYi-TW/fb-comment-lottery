## 1. Backend
- [x] 1.1 Update `FbComment.java`: Add `private String timestamp;` + getter/setter.
- [x] 1.2 Update `FbScraperService.java`:
    - [x] Locate timestamp link using Regex (relative time).
    - [x] Extract `aria-label` or Hover -> Read Tooltip.
    - [x] Parse/Format date if possible (or keep as raw string if it matches requirement).

## 2. Frontend
- [x] 2.1 Update `ParticipantsTable.jsx`:
    - [x] Add "Time" column.
    - [x] Display `p.timestamp`.

## 3. Build
- [x] 3.1 Build and Deploy.
