# Change: Phase 7 - Enhanced Logging

## Why
The user needs visibility into the scraping process to understand why it might be stopping early or behaving unexpectedly. Currently, the service fails silently or with minimal output.

## What Changes
- **Add Logger:** Use `org.slf4j.Logger` in `FbScraperService`.
- **Log Key Events:**
    - Navigation start/finish.
    - Modal detection/closing.
    - Filter switching attempts and results.
    - Loop progress (Iteration count, total comments found, "View more" clicks).
    - Errors and exceptions.

## Impact
- **Affected Code:** `src/main/java/.../service/FbScraperService.java`
- **User Experience:** detailed logs in the terminal running Spring Boot.
