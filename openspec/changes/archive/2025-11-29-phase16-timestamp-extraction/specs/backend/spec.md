## ADDED Requirements
### Requirement: Timestamp Extraction
The system SHALL extract the absolute timestamp of each comment.

#### Scenario: Hover Timestamp
- **WHEN** a comment shows relative time (e.g., "2w")
- **THEN** the system extracts the full date/time (e.g., "2023/11/20 10:00:00") from the element's attributes or tooltip
