## MODIFIED Requirements
### Requirement: Robust Selectors
The scraping logic MUST rely on Accessibility Roles (ARIA) and Text Content, supporting **Multiple Locales** (English, Traditional Chinese).

#### Scenario: Chinese Locale
- **WHEN** the Facebook page renders in Traditional Chinese
- **THEN** the system identifies "最相關" (Most relevant) and "所有留言" (All comments) correctly
