const { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const fs = require('fs');

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
    viewport: null,
    recordVideo: { dir: 'reports/videos/' }
  });
  this.page = await context.newPage();
});

After(async function (scenario) {
  if (scenario.result.status === Status.FAILED) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');
  }

  const videoPath = await this.page.video()?.path();
  await this.page.close();
  await context.close();

  if (videoPath && fs.existsSync(videoPath)) {
    if (scenario.result.status === Status.FAILED) {
      const video = fs.readFileSync(videoPath);
      this.attach(video, 'video/webm');
    }
    fs.unlinkSync(videoPath);
  }
});

AfterAll(async function () {
  await browser.close();
});
