const { expect } = require('@playwright/test');

class BorrowingCalculatorPage {
  constructor(page) {
    this.page = page;
    this.url =
      'https://www.anz.com.au/personal/home-loans/calculators-tools/borrowing-power-calculator/';

    // ===== Application type =====
    this.singleApplicationRadio = page.locator('#application_type_single');
    this.jointApplicationRadio = page.locator('#application_type_joint');

    // ===== Property type =====
    this.ownerOccupiedRadio = page.locator('#borrow_type_home');
    this.investmentRadio = page.locator('#borrow_type_investment');

    // ===== Dependants =====
    this.dependantsSelect = page.locator('select[name="dependants"]');

    // ===== Form fields (using aria-labelledby for semantic selection) =====
    this.incomeInput = page.getByRole('textbox', { name: /Your annual income \(before tax\)/i });
    this.otherIncomeInput = page.getByRole('textbox', { name: /Your annual other income/i });
    this.livingExpensesInput = page.getByRole('textbox', { name: /Monthly living expenses/i });
    this.currentHomeLoanInput = page.getByRole('textbox', { name: /Current home loan monthly repayments/i });
    this.otherLoanInput = page.getByRole('textbox', { name: /Other loan monthly repayments/i });
    this.otherCommitmentsInput = page.getByRole('textbox', { name: /Other monthly commitments/i });
    this.creditCardLimitInput = page.getByRole('textbox', { name: /Total credit card limits/i });

    // ===== Actions =====
    this.calculateButton = page.getByRole('button', {
      name: 'Work out how much I could borrow',
    });
    this.startOverButton = page.getByRole('button', { name: 'Start over' });

    // ===== Result =====
    this.resultContainer = page.locator('body');
  }

  // ---------- Navigation ----------

  async navigate() {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
  }

  // ---------- Selections ----------

  async selectApplicationType(type) {
    if (/single/i.test(type)) {
      await this.singleApplicationRadio.check();
    } else if (/joint/i.test(type)) {
      await this.jointApplicationRadio.check();
    }
  }

  async selectPropertyType(type) {
    if (/live in|owner/i.test(type)) {
      await this.ownerOccupiedRadio.check();
    } else if (/investment/i.test(type)) {
      await this.investmentRadio.check();
    }
  }

  async selectDependants(count) {
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




  async enterDependants(count) {
    await this.selectDependants(count);
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

  async calculate() {
    await expect(this.calculateButton).toBeEnabled();
    await this.calculateButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickCalculate() {
    await this.calculate();
  }

  async startOver() {
    await this.startOverButton.click();
    await expect(this.incomeInput).toHaveValue('0');
  }

  async clickStartOver() {
    await this.startOver();
  }

  // ---------- Assertions / Getters ----------

  async getBorrowingEstimate() {
    const bodyText = await this.resultContainer.textContent();

    // Look for dollar amounts in the format $XXX,XXX
    const matches = bodyText.match(/\$([0-9]{1,3}(,[0-9]{3})*)/g);

    if (matches && matches.length > 0) {
      // Return the largest amount found (likely the borrowing estimate)
      const amounts = matches.map(m => {
        const num = parseInt(m.replace(/[$,]/g, ''));
        return { text: m, value: num };
      });

      amounts.sort((a, b) => b.value - a.value);
      return amounts[0].text;
    }

    return '';
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
