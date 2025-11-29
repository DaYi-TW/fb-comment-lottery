# ui Specification

## Purpose
TBD - created by archiving change phase3-ui-integration. Update Purpose after archive.
## Requirements
### Requirement: Web Interface
The system SHALL provide an **Elegant, Content-Focused** web interface inspired by modern AI tools (like Claude).

#### Scenario: Layout
- **WHEN** the user opens the app
- **THEN** the interface presents a sidebar for controls and a central area for input/output
- **AND** the typography uses Serif fonts for headings to evoke a "literary/smart" feel

### Requirement: Real-Time Progress
The system SHALL provide real-time feedback on the scraping process.

#### Scenario: Scrape Progress
- **WHEN** the scraper is running
- **THEN** the user interface displays the count of comments found so far (e.g., "Found 120 comments")

### Requirement: Results Display
The system SHALL display participant details correctly in the list view.

#### Scenario: Sidebar List
- **WHEN** displaying a participant in the sidebar
- **THEN** show the first letter of their name in the avatar
- **AND** show their full name next to it
- **AND** show the timestamp in a separate element

