## ADDED Requirements
### Requirement: Multi-User Concurrency
The system SHALL support multiple simultaneous users by tracking scraping jobs independently.

#### Scenario: Concurrent Jobs
- **WHEN** User A starts a scrape
- **AND** User B starts a scrape
- **THEN** the system assigns unique Job IDs to each
- **AND** User A only sees progress/results for their specific job
