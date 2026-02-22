const{test,expect}=require('@playwright/test');

class dispositionpage{
    constructor(page,testData){
        this.page=page;
        this.rimsOption = page.getByText('RIMS');
        this.prdModule = page.getByRole('link', { name: 'PRD' });
        this.incompletePRD = page.getByRole('tab', { name: 'Incomplete PRDs' });
        this.createPRDBtn =page.getByRole('button', { name: 'Create PRD' });
        this.uploadBtn = page.getByRole('button', { name: 'Upload' });
}

async navigateToPrdModule(){
    await this.rimsOption.click();
    await this.prdModule.click();
    await this.incompletePRD.click();
    await this.createPRDBtn.click();
    await this.uploadBtn.click();
}
}