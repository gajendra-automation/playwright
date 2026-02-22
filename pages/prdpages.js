class prdpage {
  constructor(page) {
    this.page = page;
    this.rimsLink = page.getByText('RIMS');
    this.prdLink = page.getByRole('link', { name: 'PRD' });
    this.openPrdsTab = page.getByRole('tab', { name: 'Open PRDs' });
    this.incompletePRD = page.getByRole('tab', { name: 'Incomplete PRDs' });
    this.createPRDBtn =page.getByRole('button', { name: 'Create PRD' });
    this.uploadBtn = page.getByRole('button', { name: 'Upload' });
    this.attachFileBtn = page.getByRole('button', { name: 'Attach Csv file prepended' });
    this.confirmBtn = page.getByRole('button', { name: 'Confirm' });
    this.finishBtn = page.getByRole('button', { name: 'Finish' });
  }

  async navigateToPrd() {
    await this.rimsLink.click();
    await this.prdModule.click();
    await this.incompletePRD.click();
   
  }
  async uploadprdFile(filePath) {
     await this.createPRDBtn.click();
    await this.uploadBtn.click();
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.attachFileBtn.click()
    ]);
    await fileChooser.setFiles(filePath);
    await this.page.waitForTimeout(3000);
    await this.confirmBtn.click();
    await this.finishBtn.click();
  }
}
module.exports = { prdpage };
