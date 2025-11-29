## ADDED Requirements
### Requirement: Lottery Execution
The system SHALL provide a configurable mechanism to select winners from a provided list of comments.

#### Scenario: Basic Draw
- **WHEN** a list of comments is provided with `count=1`
- **THEN** one winner is returned

#### Scenario: Filter by Keyword
- **WHEN** `filterKeyword` is set (e.g., "TAG")
- **THEN** only comments containing "TAG" are eligible for selection

#### Scenario: Deduplication
- **WHEN** `allowDuplicate` is `false`
- **THEN** multiple comments from the same `author` are treated as a single entry (increasing fairness)

### Requirement: Lottery API
The system SHALL expose a REST endpoint to trigger the lottery.

#### Scenario: POST /fb/lottery
- **WHEN** a POST request is sent to `/fb/lottery` with configurations and a list of participants
- **THEN** the response contains the list of `winners`