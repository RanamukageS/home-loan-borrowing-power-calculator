class BorrowingCalculatorPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://www.anz.com.au/personal/home-loans/calculators-tools/borrowing-power-calculator/';
  }

  async navigate() {
    await this.page.goto(this.url, { waitUntil: 'load', timeout: 60000 });
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(3000);
  }

  async selectApplicationType(type) {
    await this.page.waitForTimeout(1000);

    if (type.toLowerCase().includes('single')) {
      await this.page.click('#application_type_single');
    } else if (type.toLowerCase().includes('joint')) {
      await this.page.click('#application_type_joint');
    }

    await this.page.waitForTimeout(500);
  }

  async enterDependants(count) {
    await this.page.waitForTimeout(500);

    await this.page.evaluate((desiredValue) => {
      const select = document.querySelector('select');
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

    await this.page.waitForTimeout(500);
  }

  async selectPropertyType(type) {
    await this.page.waitForTimeout(500);

    if (type.toLowerCase().includes('live in')) {
      await this.page.click('#borrow_type_home');
    } else if (type.toLowerCase().includes('investment')) {
      await this.page.click('#borrow_type_investment');
    }

    await this.page.waitForTimeout(500);
  }

  async enterIncome(amount) {
    const cleanAmount = amount.replace(/[$,]/g, '');
    await this.page.waitForTimeout(500);

    // Get all visible text inputs and skip the search input
    const inputs = await this.page.locator('input[type="text"]:visible').all();
    let fieldIndex = 0;

    for (let i = 0; i < inputs.length; i++) {
      const id = await inputs[i].getAttribute('id');
      const name = await inputs[i].getAttribute('name');

      // Skip search input
      if (id === 'searchinput' || name === 'qu') {
        continue;
      }

      fieldIndex++;
      if (fieldIndex === 1) {
        await inputs[i].fill(cleanAmount);
        break;
      }
    }

    await this.page.waitForTimeout(500);
  }

  async enterOtherIncome(amount) {
    const cleanAmount = amount.replace(/[$,]/g, '');
    await this.page.waitForTimeout(500);

    const inputs = await this.page.locator('input[type="text"]:visible').all();
    let fieldIndex = 0;

    for (let i = 0; i < inputs.length; i++) {
      const id = await inputs[i].getAttribute('id');
      const name = await inputs[i].getAttribute('name');

      if (id === 'searchinput' || name === 'qu') {
        continue;
      }

      fieldIndex++;
      if (fieldIndex === 2) {
        await inputs[i].fill(cleanAmount);
        break;
      }
    }

    await this.page.waitForTimeout(500);
  }

  async enterLivingExpenses(amount) {
    const cleanAmount = amount.replace(/[$,]/g, '');
    await this.page.waitForTimeout(500);

    const inputs = await this.page.locator('input[type="text"]:visible').all();
    let fieldIndex = 0;

    for (let i = 0; i < inputs.length; i++) {
      const id = await inputs[i].getAttribute('id');
      const name = await inputs[i].getAttribute('name');

      if (id === 'searchinput' || name === 'qu') {
        continue;
      }

      fieldIndex++;
      if (fieldIndex === 3) {
        await inputs[i].fill(cleanAmount);
        break;
      }
    }

    await this.page.waitForTimeout(500);
  }

  async enterCurrentHomeLoan(amount) {
    const cleanAmount = amount.replace(/[$,]/g, '');
    await this.page.waitForTimeout(500);

    const inputs = await this.page.locator('input[type="text"]:visible').all();
    let fieldIndex = 0;

    for (let i = 0; i < inputs.length; i++) {
      const id = await inputs[i].getAttribute('id');
      const name = await inputs[i].getAttribute('name');

      if (id === 'searchinput' || name === 'qu') {
        continue;
      }

      fieldIndex++;
      if (fieldIndex === 4) {
        await inputs[i].fill(cleanAmount);
        break;
      }
    }

    await this.page.waitForTimeout(500);
  }

  async enterOtherLoan(amount) {
    const cleanAmount = amount.replace(/[$,]/g, '');
    await this.page.waitForTimeout(500);

    const inputs = await this.page.locator('input[type="text"]:visible').all();
    let fieldIndex = 0;

    for (let i = 0; i < inputs.length; i++) {
      const id = await inputs[i].getAttribute('id');
      const name = await inputs[i].getAttribute('name');

      if (id === 'searchinput' || name === 'qu') {
        continue;
      }

      fieldIndex++;
      if (fieldIndex === 5) {
        await inputs[i].fill(cleanAmount);
        break;
      }
    }

    await this.page.waitForTimeout(500);
  }

  async enterOtherCommitments(amount) {
    const cleanAmount = amount.replace(/[$,]/g, '');
    await this.page.waitForTimeout(500);

    const inputs = await this.page.locator('input[type="text"]:visible').all();
    let fieldIndex = 0;

    for (let i = 0; i < inputs.length; i++) {
      const id = await inputs[i].getAttribute('id');
      const name = await inputs[i].getAttribute('name');

      if (id === 'searchinput' || name === 'qu') {
        continue;
      }

      fieldIndex++;
      if (fieldIndex === 6) {
        await inputs[i].fill(cleanAmount);
        break;
      }
    }

    await this.page.waitForTimeout(500);
  }

  async enterCreditCardLimit(amount) {
    const cleanAmount = amount.replace(/[$,]/g, '');
    await this.page.waitForTimeout(500);

    const inputs = await this.page.locator('input[type="text"]:visible').all();
    let fieldIndex = 0;

    for (let i = 0; i < inputs.length; i++) {
      const id = await inputs[i].getAttribute('id');
      const name = await inputs[i].getAttribute('name');

      if (id === 'searchinput' || name === 'qu') {
        continue;
      }

      fieldIndex++;
      if (fieldIndex === 7) {
        await inputs[i].fill(cleanAmount);
        break;
      }
    }

    await this.page.waitForTimeout(500);
  }

  async clickCalculate() {
    await this.page.click('button:has-text("Work out how much I could borrow")');
    await this.page.waitForTimeout(5000);
  }

  async clickStartOver() {
    await this.page.click('button:has-text("Start over")');
    await this.page.waitForTimeout(2000);
  }

  async getBorrowingEstimate() {
    await this.page.waitForTimeout(2000);

    // Try to find the result text
    const bodyText = await this.page.locator('body').textContent();

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
    await this.page.waitForTimeout(1000);

    const inputs = await this.page.locator('input[type="text"]:visible').all();

    for (let i = 0; i < inputs.length; i++) {
      const id = await inputs[i].getAttribute('id');
      const name = await inputs[i].getAttribute('name');

      if (id === 'searchinput' || name === 'qu') {
        continue;
      }

      const value = await inputs[i].inputValue();
      if (value !== '' && value !== '0') {
        return false;
      }
    }

    return true;
  }
}

module.exports = BorrowingCalculatorPage;
