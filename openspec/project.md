# Project Context

## Purpose
The **fb-comment-lottery-springboot** is a Facebook Comment Scraper & Lottery System.
It aims to provide an automated way to scrape public Facebook comments via **Playwright** (without Graph API) and perform fair, transparent lottery draws for marketing campaigns and fan interactions.

## Tech Stack
- **Language:** Java 25 (Project Default) / Java 17+ (Proposal Compatible)
- **Framework:** Spring Boot 4.0.0
- **Browser Automation:** Playwright for Java
- **Build Tool:** Maven
- **Persistence:** H2 / MySQL (Optional for records)

## Project Conventions

### Architecture
- **Layered Architecture:**
    - **Controller:** REST APIs (`/fb/comments`, `/fb/lottery`).
    - **Service:** Business logic (`FbScraperService`, `LotteryService`).
    - **Model:** Data transfer objects (`FbComment`, `Winner`).
- **Scraping Strategy:** Use Playwright to simulate user interaction. Target elements using **ARIA roles, DOM structure, and text content** (e.g., `getByRole`, `filter(hasText)`) rather than brittle CSS classes, as Facebook uses dynamic/obfuscated class names.
- **Lottery Logic:** Stateless or Stateful (configurable), supporting filtering (keywords, duplicates).

### API Design
- `GET /fb/comments?url={postUrl}`: Scrape comments.
- `POST /fb/lottery`: Execute draw (inputs: count, filters, candidate list).

### Coding Style
- **Naming:** PascalCase for classes, camelCase for methods.
- **Async:** Scraping can be slow; consider asynchronous processing (`@Async`) or returning job IDs for large posts.

## Domain Context
- **No Graph API:** The system explicitly bypasses the official API limits by using browser automation.
- **Public Posts Only:** targeted at public fan pages or posts.
- **Fairness:** The lottery algorithm must be random and verifiable.

## External Dependencies
- **Playwright:** Requires browser binaries (Chromium) installed/managed.
