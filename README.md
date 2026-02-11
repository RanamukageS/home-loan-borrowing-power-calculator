# Borrowing Calculator Automated Tests

Automated test suite for a borrowing calculator application using Cucumber (BDD), Playwright, and JavaScript.

## Table of Contents
- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Generating Reports](#generating-reports)

## Overview

This project contains automated tests for a borrowing power calculator. The tests are written using Behavior-Driven Development (BDD) approach with Cucumber and executed using Playwright on Chrome browser.

## Technology Stack

- **JavaScript** - Programming language
- **Cucumber** - BDD framework for writing test scenarios in Gherkin syntax
- **Playwright** - Browser automation library
- **Chrome** - Target browser
- **Node.js** - Runtime environment
- **dotenv** - Environment configuration management

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
   git clone https://github.com/RanamukageS/home-loan-borrowing-power-calculator.git
   cd home-loan-borrowing-power-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install chromium
   ```

## Running Tests

### Run all tests
```bash
npm test
```

### Run with visible browser (headed mode)
Set `headless: false` in [features/support/hooks.js](features/support/hooks.js):
```js
browser = await chromium.launch({
  headless: false,
  args: ['--start-maximized']
});
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

### Report Interface
<img width="1437" height="794" alt="Screenshot 2026-02-11 at 13 48 14" src="https://github.com/user-attachments/assets/317668c4-9029-4cd4-9312-6db600264c44" />


