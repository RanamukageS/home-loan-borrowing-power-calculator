const { expect } = require('@playwright/test');
const config = require('../../config');

class BorrowingCalculatorPage {
  constructor(page) {
    this.page = page;
    this.url = config.baseUrl;

    // ===== Application type =====
    this.singleApplicationRadio = page.locator('#application_type_single');
    this.jointApplicationRadio = page.locator('#application_type_joint');

    // ===== Property type =====
    this.ownerOccupiedRadio = page.locator('#borrow_type_home');
    this.investmentRadio = page.locator('#borrow_type_investment');

    // ===== Dependants =====
    this.dependantsSelect = page.locator('select[name="dependants"]');

    // ===== Form fields (using aria-labelledby for semantic selection) =====
    this.incomeInput = page.getByRole('textbox', { name: 'Your annual income (before tax)' });
    this.otherIncomeInput = page.getByRole('textbox', { name: 'Your annual other income' });
    this.livingExpensesInput = page.getByRole('textbox', { name: 'Monthly living expenses' });
    this.currentHomeLoanInput = page.getByRole('textbox', { name: 'Current home loan monthly repayments' });
    this.otherLoanInput = page.getByRole('textbox', { name: 'Other loan monthly repayments' });
    this.otherCommitmentsInput = page.getByRole('textbox', { name: 'Other monthly commitments' });
    this.creditCardLimitInput = page.getByRole('textbox', { name: 'Total credit card limits' });

    // ===== Actions =====
    this.calculateButton = page.getByRole('button', {
      name: 'Work out how much I could borrow',
    });
    this.startOverButton = page.getByRole('button', { name: 'Start over' });

    // ===== Result =====
    this.borrowResultAmount = page.locator('#borrowResultTextAmount');
  }

  // ---------- Navigation ----------

  async navigate() {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
  }

  // ---------- Selections ----------

  async selectApplicationType(type) {
    if (type === "Single") {
      await this.singleApplicationRadio.check();
    } else if (type === "Joint") {
      await this.jointApplicationRadio.check();
    }
  }

  async selectPropertyType(type) {
    if (type === "Home to live in") {
      await this.ownerOccupiedRadio.check();
    } else if (type === "Residential investment") {
      await this.investmentRadio.check();
    }
  }

  async enterDependants(count) {
    await this.page.evaluate((desiredValue) => {
      const select = document.querySelector('select[name="dependants"]');
      if (!select) return;

      const currentValue = select.value;
      const options = Array.from(select.options).map(o => o.value);

      // Determine target value (exact match or with '+' suffix)
      const targetValue = options.includes(desiredValue) ? desiredValue :
                         options.includes(desiredValue + '+') ? desiredValue + '+' : null;

      // Only change if current value is different from target
      if (targetValue && currentValue !== targetValue) {
        select.value = targetValue;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        select.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }, count);
  }

  // ---------- Data entry ----------

  async fillCurrencyField(locator, amount) {
    const cleanAmount = amount.toString().replace(/[$,]/g, '');
    await locator.fill(cleanAmount);
  }

  async enterIncome(amount) {
    await this.fillCurrencyField(this.incomeInput, amount);
  }

  async enterOtherIncome(amount) {
    await this.fillCurrencyField(this.otherIncomeInput, amount);
  }

  async enterLivingExpenses(amount) {
    await this.fillCurrencyField(this.livingExpensesInput, amount);
  }

  async enterCurrentHomeLoan(amount) {
    await this.fillCurrencyField(this.currentHomeLoanInput, amount);
  }

  async enterOtherLoan(amount) {
    await this.fillCurrencyField(this.otherLoanInput, amount);
  }

  async enterOtherCommitments(amount) {
    await this.fillCurrencyField(this.otherCommitmentsInput, amount);
  }

  async enterCreditCardLimit(amount) {
    await this.fillCurrencyField(this.creditCardLimitInput, amount);
  }

  // ---------- Actions ----------

  async clickCalculate() {
    await expect(this.calculateButton).toBeEnabled();
    await this.calculateButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickStartOver() {
    await this.startOverButton.click();
    await expect(this.incomeInput).toHaveValue('0');
  }

  // ---------- Assertions / Getters ----------

  async getBorrowingEstimate() {
    return await this.borrowResultAmount.textContent();
  }

  async isFormCleared() {
    const fields = [
      this.incomeInput,
      this.otherIncomeInput,
      this.livingExpensesInput,
      this.currentHomeLoanInput,
      this.otherLoanInput,
      this.otherCommitmentsInput,
      this.creditCardLimitInput,
    ];

    for (const field of fields) {
      const value = await field.inputValue();
      if (value !== '' && value !== '0') {
        return false;
      }
    }
    return true;
  }
}

module.exports = BorrowingCalculatorPage;
