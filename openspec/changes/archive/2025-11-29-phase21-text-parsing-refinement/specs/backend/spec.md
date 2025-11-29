## ADDED Requirements
### Requirement: Text-Based Parsing
The system SHALL parse author and content primarily from the visible text structure.

#### Scenario: Standard Layout
- **WHEN** parsing a comment element
- **THEN** the first line of text is identified as the Author
- **AND** subsequent lines are identified as Content (filtering out timestamps)
