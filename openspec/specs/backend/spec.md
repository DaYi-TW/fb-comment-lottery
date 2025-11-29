# backend Specification

## Purpose
TBD - created by archiving change phase14-async-architecture. Update Purpose after archive.
## Requirements
### Requirement: Real-Time Progress
The system SHALL provide real-time feedback on the scraping process.

#### Scenario: Async Execution
- **WHEN** the scraper is started
- **THEN** the system returns immediately (Non-Blocking)
- **AND** the client polls for progress until completion
- **AND** the results are fetched only when ready

### Requirement: Multi-User Concurrency
The system SHALL support multiple simultaneous users by tracking scraping jobs independently.

#### Scenario: Concurrent Jobs
- **WHEN** User A starts a scrape
- **AND** User B starts a scrape
- **THEN** the system assigns unique Job IDs to each
- **AND** User A only sees progress/results for their specific job

### Requirement: Timestamp Extraction
The system SHALL extract the absolute timestamp of each comment.

#### Scenario: Dynamic Tooltip
- **WHEN** a comment shows relative time (e.g., "2w")
- **THEN** the system hovers over the element
- **AND** waits for the dynamic tooltip to appear
- **AND** extracts the full date/time from the tooltip content

### Requirement: Data Accuracy
The system SHALL correctly parse author names using valid Regular Expressions.

#### Scenario: Regex Compliance
- **WHEN** compiling the backend code
- **THEN** the regular expressions for timestamp detection MUST be valid Java strings (double backslashes)

### Requirement: Text-Based Parsing
The system SHALL parse author and content primarily from the visible text structure.

#### Scenario: Standard Layout
- **WHEN** parsing a comment element
- **THEN** the first line of text is identified as the Author
- **AND** subsequent lines are identified as Content (filtering out timestamps)

