## MODIFIED Requirements
### Requirement: Comment Scraping
The system SHALL be able to extract ALL available comments efficiently.

#### Scenario: Modal Scrolling
- **WHEN** the post is displayed in a modal (two scrollbars)
- **THEN** the system scrolls the **inner container** (or the last comment) to trigger loading
- **AND** wait times are minimized (approx. 1 second) for speed
