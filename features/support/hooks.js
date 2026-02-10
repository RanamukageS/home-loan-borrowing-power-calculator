const { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

// Set default timeout for all steps to 60 seconds
setDefaultTimeout(60000);

let browser;
let context;

BeforeAll(async function () {
  browser = await chromium.launch({
    headless: true,
    args: ['--start-maximized']
  });
});

Before(async function () {
  context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  this.page = await context.newPage();
});

After(async function (scenario) {
  if (scenario.result.status === Status.FAILED) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');
  }
  await this.page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});
