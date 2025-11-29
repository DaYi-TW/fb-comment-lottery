## MODIFIED Requirements
### Requirement: Timestamp Extraction
The system SHALL extract the absolute timestamp of each comment.

#### Scenario: Dynamic Tooltip
- **WHEN** a comment shows relative time (e.g., "2w")
- **THEN** the system hovers over the element
- **AND** waits for the dynamic tooltip to appear
- **AND** extracts the full date/time from the tooltip content
