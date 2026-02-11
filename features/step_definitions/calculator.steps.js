const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BorrowingCalculatorPage = require('../pages/BorrowingCalculatorPage');

let calculatorPage;

Given('I navigate to the borrowing calculator page', async function () {
  calculatorPage = new BorrowingCalculatorPage(this.page);
  await calculatorPage.navigate();
});

When('I select {string} as application type', async function (applicationType) {
  await calculatorPage.selectApplicationType(applicationType);
});

When('I enter {string} dependants', async function (count) {
  await calculatorPage.enterDependants(count);
});

When('I select {string} as property type', async function (propertyType) {
  await calculatorPage.selectPropertyType(propertyType);
});

When('I enter {string} as income', async function (amount) {
  await calculatorPage.enterIncome(amount);
});

When('I enter {string} as other income', async function (amount) {
  await calculatorPage.enterOtherIncome(amount);
});

When('I enter {string} as living expenses', async function (amount) {
  await calculatorPage.enterLivingExpenses(amount);
});

When('I enter {string} as current home loan repayments', async function (amount) {
  await calculatorPage.enterCurrentHomeLoan(amount);
});

When('I enter {string} as other loan repayments', async function (amount) {
  await calculatorPage.enterOtherLoan(amount);
});

When('I enter {string} as other commitments', async function (amount) {
  await calculatorPage.enterOtherCommitments(amount);
});

When('I enter {string} as total credit card limit', async function (amount) {
  await calculatorPage.enterCreditCardLimit(amount);
});

When('I click the calculate button', async function () {
  await calculatorPage.clickCalculate();
});

When('I click the start over button', async function () {
  await calculatorPage.clickStartOver();
});

Then('I should see the borrowing estimate of {string}', async function (expectedAmount) {
  await expect(calculatorPage.borrowResultAmount).toContainText(expectedAmount, { timeout: 2000 });
});

Then('all form fields should be cleared', async function () {
  await this.page.waitForTimeout(1000);

  const isCleared = await calculatorPage.isFormCleared();
  expect(isCleared).toBe(true);
});
