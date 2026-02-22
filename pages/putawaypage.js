const{test,expect}=require('@playwright/test')
class putawaypage{
    consstructor(page){
        this.page=page;
        this.putawayClick =page.getByText("Put Away / Pick Up");
    this.checkbox=page.locator("(//tr[@class='v-data-table__tr']/td)[1]");
    this.updateSublocationBtn = page.locator("//span[text()='Update Sub Location']");
    this.sublocationDropdown = page.locator("(//div[@class='v-field__append-inner']/i)[5]");
    this.submitBtn.page.locator("//span[text()='Submit']");
  }
  async completeputaway(){
    await putawayClick.click();
    await checkbox.click();
    await updateSublocationBtn.click();
    await sublocationDropdown.click();
    await this.page.getByText('r694_002').click();
    await this.submitBtn.click();
  }

    } 
    module.exports={putawaypage}
