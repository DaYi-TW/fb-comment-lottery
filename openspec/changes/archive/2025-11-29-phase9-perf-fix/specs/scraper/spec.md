## MODIFIED Requirements
### Requirement: Comment Scraping
The system SHALL be able to extract ALL available comments efficiently.

#### Scenario: Fast Startup
- **WHEN** the page loads
- **THEN** the system checks for blocking modals with a **short timeout** (max 2s) to avoid blocking execution
