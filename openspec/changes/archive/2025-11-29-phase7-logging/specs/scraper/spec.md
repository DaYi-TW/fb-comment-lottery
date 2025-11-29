## ADDED Requirements
### Requirement: Observability
The scraping process MUST emit detailed logs to standard output to assist in debugging and monitoring progress.

#### Scenario: Logging Progress
- **WHEN** the scraper is running
- **THEN** it logs the current iteration, total comments scraped, and specific actions (like clicking buttons)
