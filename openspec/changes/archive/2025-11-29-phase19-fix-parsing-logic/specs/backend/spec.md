## ADDED Requirements
### Requirement: Data Accuracy
The system SHALL correctly distinguish between Author, Content, and Timestamp.

#### Scenario: Ambiguous Layout
- **WHEN** the timestamp link appears prominently
- **THEN** the system MUST NOT mistake it for the author name
- **AND** MUST correctly parse the author from the aria-label or structural position
