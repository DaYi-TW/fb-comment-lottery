# scraper Specification

## Purpose
TBD - created by archiving change phase2-fb-comment-scraper. Update Purpose after archive.
## Requirements
### Requirement: Comment Scraping
The system SHALL be able to extract comments from a public Facebook post URL.

#### Scenario: Successful Scrape
- **WHEN** a valid public Facebook post URL is provided
- **THEN** the system returns a list of comments (Author + Content)

#### Scenario: Scrolling
- **WHEN** the post has more comments than initially visible
- **THEN** the system automatically scrolls or clicks "View more" to load them

### Requirement: Robust Selectors
The scraping logic MUST rely on Accessibility Roles (ARIA) and Text Content rather than obfuscated CSS classes.

#### Scenario: Selector Strategy
- **WHEN** identifying a comment element
- **THEN** it is found using `role="article"` or similar semantic structures

