# scraper Specification

## Purpose
TBD - created by archiving change phase2-fb-comment-scraper. Update Purpose after archive.
## Requirements
### Requirement: Comment Scraping
The system SHALL be able to extract ALL available comments efficiently.

#### Scenario: Fast Startup
- **WHEN** the page loads
- **THEN** the system checks for blocking modals with a **short timeout** (max 2s) to avoid blocking execution

### Requirement: Robust Selectors
The scraping logic MUST rely on Accessibility Roles (ARIA) and Text Content, supporting **Multiple Locales** (English, Traditional Chinese).

#### Scenario: Chinese Locale
- **WHEN** the Facebook page renders in Traditional Chinese
- **THEN** the system identifies "最相關" (Most relevant) and "所有留言" (All comments) correctly

### Requirement: Observability
The scraping process MUST emit detailed logs to standard output to assist in debugging and monitoring progress.

#### Scenario: Logging Progress
- **WHEN** the scraper is running
- **THEN** it logs the current iteration, total comments scraped, and specific actions (like clicking buttons)

