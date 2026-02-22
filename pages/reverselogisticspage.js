class reverselogisticspage {
  constructor(page,testData5) {
    this.page = page;
     this.url = testData5.url?.hyperlink || testData5.url?.text || testData5.url;
    this.username = testData5.username;
    this.password = testData5.password;
     this.usernameField = page.locator('input[type="text"]');
    this.passwordField = page.locator('input[type="password"]');
    this.loginBtn = page.locator('//span[text()="Login"]');
    this.menuButton = page.locator('#button_1 span').first();
    this.reverseLogisticsLink = page.getByRole('link', { name: 'Reverse Logistics' });
    this.serachDropdown=page.locator("(//i)[09]");
    this.ticketNoColumn = page.locator("//div[text()='Ticket No']");
    this.searchBox = page.getByLabel('Search');
    this.checkbox = page.locator("(//input[@type='checkbox'])[2]");
    this.updateConfirmationBtn = page.locator("//button/span[text()='Update Confirmation ']");
    this.confirmationGiven = page.locator('div').filter({ hasText: /^Confirmation Given$/ }).first();
    this.remarksField = page.getByRole('textbox', { name: 'Remarks Remarks' });
    this.remarksOption = page.locator("//div[text()='Dealers details needed']");
    this.confirmBtn = page.getByRole('button', { name: 'Confirm', exact: true });

    this.updateAssignmentBtn = page.getByRole('button', { name: 'Update Assignment' });
    this.logisticsDropdown = page.getByRole('textbox', { name: 'Select the Logistics Partners' });
    this.bbLogisticsOption = page.locator("//div[text()='Bb Logistics']");

    this.updateStatusBtn = page.getByRole('button', { name: 'Update Status' });
    this.updatePickupOption = page.getByText('Update Pickup Details');
    this.pickupDateField = page.getByRole('textbox', { name: 'Pick Up Date Pick Up Date' });
    this.selectDate = page.getByRole('button', { name: '27' });

    this.updateDropOption = page.locator("//div[text()='Update Drop Details']");
    this.dropDateField = page.getByLabel("Drop Date");
    this.userMenu = page.locator("//span[@class='pull-right'][1]");
    this.logoutBtn = page.getByText('Logout', { exact: true });
  }
   async navigate() {
    await this.page.goto(this.url);
  }

  async login() {
    await this.usernameField.fill(this.username);
    await this.passwordField.fill(this.password);
    await this.loginBtn.click();
  }

  async navigateToReverseLogistics() {
    await this.page.waitForTimeout(3000);
    await this.menuButton.click();
    await this.reverseLogisticsLink.click();
  }

  async searchTicket(ticketId) {
    await this.serachDropdown.click();
    await this.ticketNoColumn.click();
    await this.searchBox.click();
    await this.page.waitForTimeout(2000);
    await this.searchBox.fill(global.subrequestId);
    await this.page.keyboard.press('Enter');
  }

  async updateConfirmation() {
    await this.checkbox.click();
    await this.updateConfirmationBtn.click();
    await this.confirmationGiven.click();
    await this.remarksField.click();
    await this.remarksOption.click();
    await this.confirmBtn.click();
  }

  async updateAssignment() {
    await this.checkbox.click();
    await this.updateAssignmentBtn.click();
    await this.logisticsDropdown.click();
    await this.bbLogisticsOption.click();
    await this.confirmBtn.click();
  }

  async updatePickup() {
    await this.checkbox.click();
    await this.updateStatusBtn.click();
    await this.updatePickupOption.click();
    await this.pickupDateField.click();
    
   // Select the first enabled date dynamically
   await this.selectDate.click();
    await this.page.getByRole('dialog').locator('div').filter({ hasText: 'Pick Up Date' }).nth(2).click();
    await this.confirmBtn.click();
  }

  async updateDrop() {
    await this.checkbox.click();
    await this.updateStatusBtn.click();
    await this.updateDropOption.click();
    await this.dropDateField.click();
    // Select the first enabled date dynamically
    await this.selectDate.click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('dialog').locator('div').filter({ hasText: 'Drop Date' }).nth(2).click();
    await this.confirmBtn.click();
  }

  async logout() {
    await this.userMenu.click();
    await this.logoutBtn.click();
  }
}

module.exports = { reverselogisticspage };
