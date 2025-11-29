## MODIFIED Requirements
### Requirement: Comment Scraping
The system SHALL be able to extract **ALL** available comments from a public Facebook post URL, handling pagination and filtering.

#### Scenario: Deep Scraping
- **WHEN** a post has 1000+ comments
- **THEN** the system switches filter to "All comments"
- **AND** repeatedly expands the comment section until the end is reached
