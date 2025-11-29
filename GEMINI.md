# fb-comment-lottery-springboot (Dayi)

## Project Overview
**Facebook Comment Scraper & Lottery System**
A Spring Boot application designed to scrape comments from public Facebook posts using **Playwright** and conduct lottery draws. It provides a REST API for integration with frontends or other tools.

## Tech Stack
- **Language:** Java 25
- **Framework:** Spring Boot 4.0.0
- **Automation:** Playwright for Java
- **Build Tool:** Maven

## Key Features
1.  **Comment Scraper:** Auto-scroll and parse comments from FB posts (bypassing Graph API).
2.  **Lottery Engine:** Random winner selection with filters (keywords, unique users).
3.  **Export:** JSON/CSV output.

## Getting Started

### Prerequisites
- Java 25 SDK
- Maven

### Commands
```bash
# Build
./mvnw clean install

# Run
./mvnw spring-boot:run

# Test
./mvnw test
```