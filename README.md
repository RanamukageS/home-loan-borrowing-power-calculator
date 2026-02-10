# Borrowing Calculator Automated Tests

Automated test suite for a borrowing calculator application using Cucumber (BDD), Playwright, and JavaScript.

## Table of Contents
- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Generating Reports](#generating-reports)
- [Test Scenarios](#test-scenarios)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

## Overview

This project contains automated tests for a borrowing power calculator. The tests are written using Behavior-Driven Development (BDD) approach with Cucumber and executed using Playwright on Chrome browser.

## Technology Stack

- **JavaScript** - Programming language
- **Cucumber** - BDD framework for writing test scenarios in Gherkin syntax
- **Playwright** - Browser automation library
- **Chrome** - Target browser
- **Node.js** - Runtime environment

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download Git](https://git-scm.com/)

To verify installations:
```bash
node --version
npm --version
git --version
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AutomationTest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install chromium
   ```

## Project Structure

```
AutomationTest/
├── features/
│   ├── borrowing-calculator.feature    # Gherkin feature file with test scenarios
│   ├── pages/
│   │   └── BorrowingCalculatorPage.js  # Page Object Model
│   ├── step_definitions/
│   │   └── calculator.steps.js         # Step definitions
│   └── support/
│       └── hooks.js                    # Cucumber hooks (Before/After)
├── reports/                            # Test reports (generated after test run)
│   ├── cucumber-report.json           # JSON format report
│   ├── cucumber-report.xml            # XML/JUnit format report
│   ├── cucumber-report.html           # Basic HTML report
│   └── html-report/                   # Enhanced HTML report
│       └── index.html
├── cucumber.js                        # Cucumber configuration
├── playwright.config.js               # Playwright configuration
├── generate-report.js                 # HTML report generator script
├── package.json                       # Project dependencies
└── README.md                          # This file
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests with Chrome profile
```bash
npm run test:chrome
```

### Run with visible browser (non-headless mode)
Modify [playwright.config.js](playwright.config.js) and change `headless: false`

### Run specific feature
```bash
npx cucumber-js features/borrowing-calculator.feature
```

## Generating Reports

Reports are automatically generated when tests run. The test execution produces three types of reports:

1. **JSON Report** - `reports/cucumber-report.json`
2. **XML Report** - `reports/cucumber-report.xml`
3. **HTML Reports** - `reports/cucumber-report.html` and `reports/html-report/index.html`

### Generate Enhanced HTML Report

After running tests, generate an enhanced HTML report:

```bash
npm run report
```

The enhanced HTML report will be available at: `reports/html-report/index.html`

### View the Report

Open the HTML report in your browser:

**Mac/Linux:**
```bash
open reports/html-report/index.html
```

**Windows:**
```bash
start reports/html-report/index.html
```

Or simply navigate to the file in your file explorer and open it with your preferred browser.

## Test Scenarios

### Scenario 1: Calculate Borrowing Estimate
Tests the calculation of borrowing power for a single person with specific financial details:
- Application Type: Single
- Dependants: 0
- Property Type: Home to live in
- Income: $100,000
- Other Income: $10,000
- Living Expenses: $2,000
- Current Home Loan Repayments: $0
- Other Loan Repayments: $100
- Other Commitments: $0
- Credit Card Limit: $10,000

**Expected Result:** Borrowing estimate of $530,000

### Scenario 2: Clear Form with Start Over
Tests that clicking the "Start over" button properly clears all form fields.

**Expected Result:** All form fields are reset to their default values

## CI/CD Integration

This test suite is designed to run in CI/CD pipelines. The tests can be executed from the command line and produce JSON/XML reports that can be consumed by CI/CD tools.

### GitHub Actions Example

```yaml
name: Automated Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Install Playwright browsers
        run: npx playwright install chromium
      - name: Run tests
        run: npm test
      - name: Generate HTML report
        if: always()
        run: npm run report
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: test-reports
          path: reports/
```

### Jenkins Example

```groovy
pipeline {
    agent any
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npx playwright install chromium'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Generate Report') {
            steps {
                sh 'npm run report'
            }
        }
    }
    post {
        always {
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'reports/html-report',
                reportFiles: 'index.html',
                reportName: 'Test Report'
            ])
            junit 'reports/cucumber-report.xml'
        }
    }
}
```

## Troubleshooting

### Issue: Tests fail with "browser not found" error
**Solution:** Install Playwright browsers
```bash
npx playwright install chromium
```

### Issue: Timeout errors during test execution
**Solution:** Increase timeout in [playwright.config.js](playwright.config.js):
```javascript
timeout: 90000  // Increase to 90 seconds
```

### Issue: Cannot generate HTML report
**Solution:** Ensure tests have run at least once to generate the JSON report:
```bash
npm test
npm run report
```

### Issue: Port already in use
**Solution:** Close any applications using the same port or modify the configuration

### Issue: Selector not found
**Solution:** The website structure may have changed. Update selectors in [BorrowingCalculatorPage.js](features/pages/BorrowingCalculatorPage.js)

## Report Locations

After running the tests, find the reports at:

- **JSON Report:** `reports/cucumber-report.json`
- **XML Report:** `reports/cucumber-report.xml`
- **Basic HTML Report:** `reports/cucumber-report.html`
- **Enhanced HTML Report:** `reports/html-report/index.html` (after running `npm run report`)

## Additional Notes

- Tests run in headless mode by default for CI/CD compatibility
- Screenshots are captured automatically on test failures
- Page Object Model pattern is used for better maintainability
- All input values are cleaned (removing $, commas) before entry
- The test suite waits for elements to be visible before interaction

## Support

For issues or questions, please create an issue in the repository.

## License

ISC
