# Quick Start Guide

Get up and running with the test suite in 5 minutes!

## 1. Prerequisites Check

```bash
node --version   # Should be v16 or higher
npm --version    # Should be 7 or higher
```

If not installed, download from [nodejs.org](https://nodejs.org/)

## 2. Setup (First Time Only)

```bash
# Install project dependencies
npm install

# Install Playwright Chrome browser
npx playwright install chromium
```

## 3. Run Tests

```bash
# Run all tests
npm test

# Generate HTML report
npm run report
```

## 4. View Results

```bash
# Mac/Linux
open reports/html-report/index.html

# Windows
start reports/html-report/index.html
```

## Common Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:chrome` | Run tests with Chrome profile |
| `npm run report` | Generate HTML report from test results |
| `npx cucumber-js features/borrowing-calculator.feature` | Run specific feature |

## Report Locations

- **JSON**: `reports/cucumber-report.json`
- **XML**: `reports/cucumber-report.xml`
- **HTML**: `reports/html-report/index.html`

## Troubleshooting

### Browser not found
```bash
npx playwright install chromium
```

### Tests timing out
Edit [playwright.config.js](playwright.config.js) and increase timeout:
```javascript
timeout: 90000
```

### Want to see browser during test
Edit [playwright.config.js](playwright.config.js):
```javascript
headless: false
```

## Project Structure

```
features/
  ├── borrowing-calculator.feature     # Test scenarios (Gherkin)
  ├── pages/
  │   └── BorrowingCalculatorPage.js   # Page object
  └── step_definitions/
      └── calculator.steps.js          # Step implementations
```

## Adding New Tests

1. Add new scenario in [borrowing-calculator.feature](features/borrowing-calculator.feature)
2. If needed, add new steps in [calculator.steps.js](features/step_definitions/calculator.steps.js)
3. If needed, add new methods in [BorrowingCalculatorPage.js](features/pages/BorrowingCalculatorPage.js)
4. Run tests: `npm test`

## Need Help?

Check the full [README.md](README.md) for detailed documentation.
