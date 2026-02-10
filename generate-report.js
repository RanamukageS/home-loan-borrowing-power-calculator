const report = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

// Ensure reports directory exists
const reportsDir = path.join(__dirname, 'reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir);
}

// Generate the HTML report
report.generate({
  jsonDir: './reports',
  reportPath: './reports/html-report',
  metadata: {
    browser: {
      name: 'chrome',
      version: 'Latest'
    },
    device: 'Local test machine',
    platform: {
      name: process.platform,
      version: process.version
    }
  },
  customData: {
    title: 'Borrowing Calculator Test Results',
    data: [
      { label: 'Project', value: 'Borrowing Calculator Automation' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Execution Date', value: new Date().toLocaleString() },
      { label: 'Test Type', value: 'BDD - Cucumber with Playwright' }
    ]
  }
});

console.log('HTML report generated successfully at: ./reports/html-report/index.html');
