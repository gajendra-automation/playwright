// tests/login.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginpage');
const { Console } = require('console');
const { creeaterequestpage } = require('../pages/createrequestpage');
const { loginpageapk } = require('../pages/loginpageapk');
const { InspectionPage } = require('../pages/inspectionpage');
const { returnapprovalpage } = require('../pages/returnapprovalpage');
const { prdpages } = require('../pages/prdpages');
const { getTestData } = require('../utils/excelutil');
const { ReverseLogisticsPage, reverselogisticspage } = require('../pages/reverselogisticspage');
const { _android } = require('@playwright/test');
//import { test,expect } from '@playwright/test';
const { remote } = require('webdriverio');
const caps = require('../utils/capabilities');
const prd = require('../utils/prddatacreation');
const assert = require('assert');
test.describe.configure({ mode: 'serial' });

/////
const { readCsvColumn} = require('../utils/filereader');
//Generate Random number
const ts = new Date().toISOString().replace(/\D/g, '')
let record;
let pickupReqId;
let driver;

let subrequestId;
let testData;
let testData2;
let testData3;
let testData4;
let testData5;
let testData6;
let tagId;
let irdno;
let articleid;
let serialNumber1;
let serialNumber2;

test('Use CSV data in test', async ({ page }) => {
  const filePath = 'C:/Users/Blubirch.DESKTOP-EN2LGLN/PLAYWRIGHT AUTOMATION/testdata/prd_file.csv';
   irdno = readCsvColumn(filePath, 'INWARD_REFERENCE_DOCUMENT_NUMBER');
   articleid = readCsvColumn(filePath, 'SKU_CODE');
    serialNumber1 = readCsvColumn(filePath, 'SERIAL_NUMBER1');
     serialNumber2 = readCsvColumn(filePath, 'SERIAL_NUMBER2');
  ///
  
});


    function generateTagId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `T-${result}`;
}

test.beforeAll(async () => {
    testData = await getTestData('Sheet1', 'D2C_Ticket');
    console.log("Loaded Test Data:", testData);
    if (!testData) throw new Error("testData is undefined! Check your Excel sheet.");
});
test.beforeAll(async () => {
    testData2 = await getTestData('Sheet1', 'Inspection');
    console.log("Loaded Test Data:", testData2);
    if (!testData2) throw new Error("testData is undefined! Check your Excel sheet.");
});
test.beforeAll(async()=>{
   testData3 = await getTestData('Sheet1', 'Return approval');
    console.log("Loaded Test Data:", testData3);
    if (!testData3) throw new Error("testData is undefined! Check your Excel sheet.");
})

test.beforeAll(async()=>{
   testData4 = await getTestData('Sheet1', 'Return approval2');
    console.log("Loaded Test Data:", testData4);
    if (!testData4) throw new Error("testData is undefined! Check your Excel sheet.");
})
test.beforeAll(async()=>{
   testData5 = await getTestData('Sheet1', 'Reverse logistics');
    console.log("Loaded Test Data:", testData5);
    if (!testData5) throw new Error("testData is undefined! Check your Excel sheet.");
})
test.beforeAll(async()=>{
   testData6 = await getTestData('Sheet1', 'PRD');
    console.log("Loaded Test Data:", testData6);
    if (!testData6) throw new Error("testData is undefined! Check your Excel sheet.");
})




//Login and create D2C Sales request
test('1-D2C Ticket Creation', async ({ page }) => {
  test.setTimeout(60000);
  const loginPage = new LoginPage(page,testData);
  tagId = generateTagId();
  console.log('tagid generated.................',tagId);
 // const url="https://rims-demo.blubirch.com/";
  await loginPage.navigate();
  await loginPage.login();
  await loginPage.verifyLogin();
  
// Return Creation
  const returnPage = new creeaterequestpage(page,testData);
  await returnPage.verifyModuleAndStartRequest();
  await returnPage.fillCustomerDetails();
  await returnPage.fillItemDetails(undefined, undefined, tagId);
  await returnPage.submitAndVerifyOTP();
   global.subrequestId = await returnPage.captureSubRequestId();
  await returnPage.searchsubrequestId(global.subrequestId );
  await returnPage.assignServicePartner();
  await page.waitForTimeout(4000);
  await returnPage.assignServiceTechnician();
});
//SERVICE INSPECTION
test('2-Service Technician Inspection', async ({ page }) => {
test.setTimeout(60000);
  const loginPageapk = new loginpageapk(page,testData2);
   const inspectionPage = new InspectionPage(page,testData2);
  //const url="https://qa-fta.web.app/login";
  await loginPageapk.navigate();
  await loginPageapk.login();
  //await loginPageapk.verifyLogin();
// Inspection ticket
  await inspectionPage.openInspectionTicket();
  await inspectionPage.enterArticleAndSerial();

  // Activity
  await inspectionPage.answerQuestions();
  await inspectionPage.uploadFile1(
    page.locator('ion-content').filter({ hasText: 'Packaging Condition Packaging' }).getByRole('img'),
    'C:\\Users\\Blubirch.DESKTOP-EN2LGLN\\Pictures\\img7.jpg'
  );
  await inspectionPage.uploadFile2(
    page.locator('ion-content').filter({ hasText: 'Physical Condition Physical' }).getByRole('img'),
    'C:\\Users\\Blubirch.DESKTOP-EN2LGLN\\Pictures\\img7.jpg'
  );
  await inspectionPage.uploadFile3(
    page.locator('ion-content').filter({ hasText: 'Physical Condition Damage' }).getByRole('img'),
    'C:\\Users\\Blubirch.DESKTOP-EN2LGLN\\Pictures\\img7.jpg'
  );

  // Finish & submit
  await inspectionPage.completeActivity();

});
//RETURN APPROVAL
test('3-Return approval By BSM and RCSM',async({page}) =>{
  test.setTimeout(60000);
  const returnApprovalPage = new returnapprovalpage(page,testData3,testData4);
    await returnApprovalPage.navigate();
    await returnApprovalPage.login();
  // FIRST APPROVER
  await returnApprovalPage.navigateToReturnApproval();
  await returnApprovalPage.approveRefund("89", "Approved for refund");
  await returnApprovalPage.logout();
  // SECOND APPROVER
 // await loginPage.login("APR01", "blubirch@123");
  await returnApprovalPage.navigate();
  await returnApprovalPage.login2();
  await returnApprovalPage.navigateToReturnApproval();
  await returnApprovalPage.approveRefund("89", "Approved for refund");
  //await returnApprovalPage.logout();
});


//REVERSE LOGISTICS
test('4-Logistics Details Update By Logistics Manager', async ({ page }) => {
  test.setTimeout(60000);
  const rlPage=new reverselogisticspage(page,testData5);
  rlPage.navigate();
  rlPage.login();
  await rlPage.navigateToReverseLogistics();
  await rlPage.searchTicket(subrequestId);   // replace with the subrequestId
  await rlPage.updateConfirmation();
  await rlPage.updateAssignment();
  await rlPage.updatePickup();
  await rlPage.updateDrop();
  // Logout
  //await rlPage.logout();
  //console.log("======== Logistics Updated ==============");
  });




  test('5-Upload PRD File', async({page})=>{
    console.log("******RIMS FLOW STARTED******************");
    await page.goto("https://rims-demo.blubirch.com/");
    const userNameTextField=page.locator('//input[@type="text"]');
    await expect(userNameTextField).toBeVisible();
    await userNameTextField.fill("dava_admin");
    const passwordTextField=page.locator('//input[@type="password"]');
    await expect(passwordTextField).toBeVisible();
    await passwordTextField.fill("blubirch@123");
    const logInBtn = page.locator('//span[text()="Login"]');
    await expect(logInBtn).toBeVisible();
    await logInBtn.click();
    await page.getByText('RIMS').click();
    await page.getByRole('link', { name: 'PRD' }).click();
    await page.getByRole('tab', { name: 'Incomplete PRDs' }).click();
    await page.getByRole('button', { name: 'Create PRD' }).click();
    await page.getByRole('button', { name: 'Upload' }).click();
    const attachFile= page.getByRole('button', { name: 'Attach Csv file prepended' });
    //file upload
    const [fileChooser1] = await Promise.all([
      page.waitForEvent('filechooser'),  
      attachFile.click()
    ]);
  
    // Set the file(s) to upload
    await fileChooser1.setFiles('C:/Users/Blubirch.DESKTOP-EN2LGLN/PLAYWRIGHT AUTOMATION/testdata/prd_file.csv');
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Confirm' }).click();
    await page.getByRole('button', { name: 'Finish' }).click();
    await page.getByRole('link', { name: 'Incomplete PRD' }).click();
  })
  
  
  test.describe('Mobile App Login Test', function () {
      // this.tC:\Users\Blubirch.DESKTOP-EN2LGLN\Documents/PRD_demo (2).xlsx
   //console.log("44444444");
    
  
      // Before all tests, start the session
       test.beforeAll(async () => {
       driver = await remote(caps);
        //console.log("11111111111111");
      });
  
       test.afterAll(async () => {
          if (driver) {
              await driver.deleteSession();
              //console.log("3333333333");
          }
      });
      
      test('6-Inward the item to Brandcall-Log Disposition', async () => {
           //tagId = generateTagId();
         // test.setTimeout(4000);
          //console.log("22222222222");
      //     // Locate elements
          const usernameField = await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/edtEmail');
           await usernameField.waitForDisplayed({ timeout: 5000 });
          await usernameField.setValue('dava_admin');
          const passwordField = await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/edtPassword');
          await passwordField.waitForDisplayed({ timeout: 5000 });
           await passwordField.setValue('blubirch@123');
           const loginButton = await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/btnSignIn');
          await loginButton.waitForDisplayed({ timeout: 5000 });
           await loginButton.click();
           const secondCard = await driver.$('(//android.widget.FrameLayout[@resource-id="com.blubirch.rims.whirlpoolDemo:id/cvMain"])[2]/android.view.ViewGroup');
           await secondCard.waitForDisplayed({ timeout: 5000 });
           await secondCard.click();
  
  const searchIRD = await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/editText');
  await searchIRD.waitForDisplayed({ timeout: 5000 });
  await searchIRD.setValue(irdno);
  await driver.execute('mobile: performEditorAction', { action: 'search' });
  const articleIDSearchbox=driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/editText" and @text="Article Id/Tag Id"]');
  await articleIDSearchbox.waitForDisplayed({ timeout: 5000 });
  await articleIDSearchbox.setValue(articleid);
  await driver.execute('mobile: performEditorAction', { action: 'search' });
  //const serialNumber1TxtBox=driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/editText" and @text="Serial Number"]');
   //await serialNumber1TxtBox.setValue(record.SerialNumber);
  //await driver.execute('mobile: performEditorAction', { action: 'search' });
  const DOASealPresent=driver.$('//android.widget.CheckBox[@resource-id="com.blubirch.rims.whirlpoolDemo:id/checkbox" and @text="Yes"]');
  await DOASealPresent.waitForExist({ timeout: 10000 });
  await DOASealPresent.click();
  const DOASealIntact = driver.$('//android.widget.CheckBox[@resource-id="com.blubirch.rims.whirlpoolDemo:id/checkbox" and @text="No"]');
  await DOASealIntact.waitForExist({ timeout: 10000 });
  await DOASealIntact.click();
  const captureImage=driver.$('id=com.blubirch.rims.whirlpoolDemo:id/ivCapture');
  await captureImage.waitForExist({ timeout: 10000 });
  await captureImage.click();
  const selectImage=driver.$('id=com.blubirch.rims.whirlpoolDemo:id/ivConfirm');
  await selectImage.click();
  const nextBtn=driver.$('id=com.blubirch.rims.whirlpoolDemo:id/btNext');
  await nextBtn.click();
  const physicalCondition=driver.$('//android.widget.CheckBox[@resource-id="com.blubirch.rims.whirlpoolDemo:id/checkbox" and @text="Like New"]');
  await physicalCondition.waitForExist({ timeout: 10000 });
  await physicalCondition.click();
  await captureImage.waitForExist({ timeout: 10000 });
  await captureImage.click();
  await selectImage.click();
  await nextBtn.click();
  //const poweringOn=driver.$('//android.widget.CheckBox[@resource-id="com.blubirch.rims.whirlpoolDemo:id/checkbox" and @text="Yes"]');
  //await poweringOn.click();
  const accessoriesDropdown=driver.$('id=com.blubirch.rims.whirlpoolDemo:id/tvMultiSelectDropDown');
  await accessoriesDropdown.click();
  const none=driver.$('id=com.blubirch.rims.whirlpoolDemo:id/chkItem');
  await none.click();
  const okBtn=driver.$('id=android:id/button1');
  await okBtn.click();
  await accessoriesDropdown.click();
  await none.click();
  await okBtn.click();
  await nextBtn.click();
  const proceedBtn=driver.$('id=com.blubirch.rims.whirlpoolDemo:id/btnProceed');
  await proceedBtn.click();
  const enterTagID=driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/editText" and @text="Tag ID"]');
  await enterTagID.setValue(tagId);
  const generateGRN=driver.$('id=com.blubirch.rims.whirlpoolDemo:id/btnGenerateGRN');
  await generateGRN.click();
  
  // After all tests, end the session
     
  });
  });
  
  test('7-Complete putaway process/ Update sublocation', async ({ page }) => {
      test.setTimeout(120000);
      await page.goto('https://rims-demo.blubirch.com/', {timeout: 80000});
      await page.getByRole('textbox', { name: 'Enter email ID/phone number/' }).click();
      await page.getByRole('textbox', { name: 'Enter email ID/phone number/' }).fill('dava_admin');
      await page.getByRole('textbox', { name: 'Enter Password' }).click();
      await page.getByRole('textbox', { name: 'Enter Password' }).fill('blubirch@123');
      await page.getByRole('button', { name: 'Login' }).click();
      await page.getByText('RIMS').click();
      const clkPutaway=page.getByText("Put Away / Pick Up");
      await clkPutaway.click();
      const checkBox=page.locator("(//tr[@class='v-data-table__tr']/td)[1]");
      await checkBox.click();
      const updateSubLocation=page.locator("//span[text()='Update Sub Location']");
      await updateSubLocation.click();
      const selectLocationDropdown=page.locator("(//div[@class='v-field__append-inner']/i)[5]");
      await selectLocationDropdown.click();
      await page.getByText('r694_002').click();
      await page.locator("//span[text()='Submit']").click();
      const dispositionLink = page.locator("(//span[text()='Disposition'])[1]");
      await dispositionLink.click();
      await page.getByRole('link', { name: 'Brand Call Log' }).click();
      console.log("Loading till Brand Call Log page");
  
      //Pending BCL ticket page
     const pendingBCLtktPage=page.locator("//span[text()='Pending BCL Tickets']");
     await pendingBCLtktPage.click();
     await page.waitForTimeout(3000);
      await checkBox.click();
      const updateBtn=page.locator("//span[text()='Update']");
      await updateBtn.click();
      const ticketNo = page.locator("(//div[@class='v-card-text']//input[@type='text'])[1]");
      await ticketNo.click();
      await ticketNo.fill(ts);
      const ticketDate=page.locator("//input[@aria-expanded='undefined']");
      await ticketDate.click();
      const selectDate=page.locator("//div[@data-v-date='2025-10-27']");
      await selectDate.click();
     const OKBtn=page.locator("//span[text()='Ok']");
     await OKBtn.click();
    const submitBtn=page.locator("//span[text()='Submit']");
    await submitBtn.click();
    const confrmMSG=page.locator("//div[@class='v-row']//div[@class='v-card-text text-center']");
    await confrmMSG.textContent();
    console.log('pendingBCL confrmMSG :', confrmMSG);
    await OKBtn.click();
    await page.waitForTimeout(3000);
   await page.locator("//span[text()='Disposition']").click({ force: true });
    const RTVTab=page.locator("//h4[text()=' RTV ']");
    await RTVTab.click();
    const searchDropdown=page.locator("(//i)[09]");
    await searchDropdown.click();
    await page.locator("//div[text()='Tag ID']").click();
    await page.getByLabel('Search').click();
    await page.waitForTimeout(3000);
    await page.getByLabel('Search').fill(tagId);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);
    await checkBox.click();
    const updateConfBtn=page.locator("//span[text()='Update Confirmation']");
    updateConfBtn.click();
    const returnDate=page.locator("(//input[@type='text'])[6]");
    await returnDate.click();
    await selectDate.click();
    await page.locator("//span[text()='OK']").click();
    const returnMethodDropdown=page.locator("(//div[@class='v-field__append-inner']/i)[5]");
    await returnMethodDropdown.click();
    await page.locator("//div[text()='Dispatch']").click();
    await page.locator("(//div[@class='v-field__append-inner']/i)[6]").click();
    await page.locator("//div[text()='Invoice']").click();
    await submitBtn.click();
    await OKBtn.click();
   
    });
  
  
      test('8-Assign pickup request to Executive', async({page})=>{
       test.setTimeout(60000);
          await page.goto('https://rims-demo.blubirch.com/', {timeout: 80000});
          await page.getByRole('textbox', { name: 'Enter email ID/phone number/' }).click();
          await page.getByRole('textbox', { name: 'Enter email ID/phone number/' }).fill('dava_admin');
          await page.getByRole('textbox', { name: 'Enter Password' }).click();
          await page.getByRole('textbox', { name: 'Enter Password' }).fill('blubirch@123');
          await page.getByRole('button', { name: 'Login' }).click();
          await page.getByText('RIMS').click();
      
      
          const dispatchModule=page.locator("(//span[text()='Dispatch'])[1]");
        await dispatchModule.click();
        await page.waitForTimeout(3000);
         const checkBox=page.locator("(//tr[@class='v-data-table__tr']/td)[1]");
          await checkBox.click();
       // await checkBox.click();
       const  createReqBtn=page.locator("//span[text()='Create Pickup Request']");
       await createReqBtn.click();
       const assignExeBtn=page.locator("//span[text()='Assign Executive']");
       await assignExeBtn.click();
       const assignToDropdown=page.locator("(//div[@class='v-field__append-inner']/i)[7]");
          await assignToDropdown.click();
          await page.getByText("davaexecutive2@yopmail.com").click();
          //await page.locator("//span[text()='Create Request']").click();
          await assignToDropdown.click();
      const submitBtn=page.locator("//span[text()='Submit']");
      await submitBtn.click();
        const confmsg= await page.locator("//div[@class='v-card-text text-center']").textContent();
        console.log(confmsg);
      
        const match = confmsg.match(/P-[0-9]+/i);
         pickupReqId = match ? match[0] : null
        console.log("Sub Request ID:", pickupReqId);
         const OKBtn=page.locator("//span[text()='Ok']");
        await OKBtn.click();
      })
      
      
      
      test.describe('Mobile App Login Test', function () {
          // this.tC:\Users\Blubirch.DESKTOP-EN2LGLN\Documents/PRD_demo (2).xlsx
       //console.log("44444444");
      
          // Before all tests, start the session
           test.beforeAll(async () => {
           driver = await remote(caps);
            //console.log("11111111111111");
          });
      
           test.afterAll(async () => {
              if (driver) {
                  await driver.deleteSession();
                  //console.log("3333333333");
              }
          });
      
          test('9-Complete pickup request', async () => {
              
             // test.setTimeout(4000);
              //console.log("22222222222");
          //     // Locate elements
              const usernameField = await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/edtEmail');
               await usernameField.waitForDisplayed({ timeout: 5000 });
              await usernameField.setValue('davaexecutive2@yopmail.com');
              
              const passwordField = await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/edtPassword');
              await passwordField.waitForDisplayed({ timeout: 5000 });
               await passwordField.setValue('blubirch123');
               const loginButton = await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/btnSignIn');
               await loginButton.waitForDisplayed({ timeout: 5000 });
               await loginButton.click();
               const pickandPackBtn =await driver.$('//android.widget.TextView[@resource-id="com.blubirch.rims.whirlpoolDemo:id/itemTV" and @text="Pick & Pack"]');
               await pickandPackBtn.waitForDisplayed({ timeout: 5000 });
               await pickandPackBtn.click();
      
               const requestIDSearch =await driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/edtRequestId"]');
               await requestIDSearch.waitForDisplayed({ timeout: 5000 });
               await requestIDSearch.click();
               await requestIDSearch.setValue(pickupReqId);
               const  pickupReq=await driver.$('//androidx.recyclerview.widget.RecyclerView[@resource-id="com.blubirch.rims.whirlpoolDemo:id/rvItemList"]/android.view.ViewGroup[1]');
               await pickupReq.click();
               const scanSubLoc = await driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/editText" and @text="Scan Sub-location ID"]');
               await scanSubLoc.click();
               await scanSubLoc.setValue('r694_002');
               const scanTagId= await driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/editText" and @text="Scan Tag/Box/Toat ID"]');
               await scanTagId.click();
               await scanTagId.setValue(tagId);
               const arrowBtn = await driver.$('//android.widget.Button[@resource-id="com.blubirch.rims.whirlpoolDemo:id/btnPack"]');
               await arrowBtn.click();
               const proceedBtn = await driver.$('//android.widget.Button[@resource-id="com.blubirch.rims.whirlpoolDemo:id/btnRight"]');
               await proceedBtn.click();
               const scanTagId2 = await driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/editText" and @text="Scan Tag/Box/Toat ID"]');
               await scanTagId2.waitForDisplayed({ timeout: 5000 });
               await scanTagId2.click();
               await scanTagId2.setValue(tagId);
               const scanSubLoc2 = await driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/editText" and @text="Scan Sub-Location ID"]');
               await scanSubLoc2.setValue('GCC_01');
               const arrowBtn2 =await driver.$('//android.widget.Button[@resource-id="com.blubirch.rims.whirlpoolDemo:id/btnPack"]');
               await arrowBtn2.click();
               
               const submitBtn2 =driver.$('//android.widget.Button[@resource-id="com.blubirch.rims.whirlpoolDemo:id/btnRight"]');
               await submitBtn2.waitForDisplayed({ timeout: 5000 });
               await submitBtn2.click();
               const pickupConfrmMsgElem = await driver.$('//android.widget.TextView[@resource-id="com.blubirch.rims.whirlpoolDemo:id/md_text_message"]').getText();
               //await pickupConfrmMsgElem.waitForDisplayed({ timeout: 5000 });
               console.log("Pickup confirm message:", pickupConfrmMsgElem);
               const okBtnInPickup = await driver.$('//android.widget.Button[@resource-id="com.blubirch.rims.whirlpoolDemo:id/md_button_positive"]');
               await okBtnInPickup.click();
      
          });
      
      });
      
      test('10-Assign Packaging request to Executive',async({page})=>{
          test.setTimeout(60000);
          await page.goto('https://rims-demo.blubirch.com/', {timeout: 80000});
          await page.getByRole('textbox', { name: 'Enter email ID/phone number/' }).click();
          await page.getByRole('textbox', { name: 'Enter email ID/phone number/' }).fill('dava_admin');
          await page.getByRole('textbox', { name: 'Enter Password' }).click();
          await page.getByRole('textbox', { name: 'Enter Password' }).fill('blubirch@123');
          await page.getByRole('button', { name: 'Login' }).click();
          await page.getByText('RIMS').click();
      
      
          const dispatchModule=page.locator("(//span[text()='Dispatch'])[1]");
        await dispatchModule.click();
      
        const clkUpdatePackagingReq=page.locator("//span[text()='Pending Packaging']");
        await clkUpdatePackagingReq.click();
         const checkBox=page.locator("(//tr[@class='v-data-table__tr']/td)[1]");
         await page.waitForTimeout(3000);
          await checkBox.click();
       const  createReqBtn=page.locator("//span[text()='Create Packaging Request']");
       await createReqBtn.click();
       const assignExeBtn=page.locator("//span[text()='Assign Executive']");
       await assignExeBtn.click();
       const assignToDropdown=page.locator("(//div[@class='v-field__append-inner']/i)[6]");
      await assignToDropdown.click();
      await page.getByText("davaexecutive2@yopmail.com").click();
      //await page.locator("//span[text()='Create Request']").click();
      await assignToDropdown.click();
      const submitBtn=page.locator("//span[text()='Submit']");
      await submitBtn.click();
        const confmsg= await page.locator("//div[@class='v-card-text text-center']").textContent();
        console.log(confmsg);
      
        const match = confmsg.match(/P-[0-9]+/i);
         pickupReqId = match ? match[0] : null
        console.log("Sub Request ID:", pickupReqId);
         const OKBtn=page.locator("//span[text()='Ok']");
        await OKBtn.click();
      });
      
      
      test.describe('Mobile App Login Test', function () {
          // this.tC:\Users\Blubirch.DESKTOP-EN2LGLN\Documents/PRD_demo (2).xlsx
       //console.log("44444444");
      
          // Before all tests, start the session
           test.beforeAll(async () => {
           driver = await remote(caps);
            //console.log("11111111111111");
          });
      
           test.afterAll(async () => {
              if (driver) {
                  await driver.deleteSession();
                  //console.log("3333333333");
              }
          });
      
      test('11-Complete packaging request', async () => {
      
             // test.setTimeout(4000);
              //console.log("22222222222");
          //     // Locate elements
              const usernameField = await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/edtEmail');
               await usernameField.waitForDisplayed({ timeout: 5000 });
              await usernameField.setValue('davaexecutive2@yopmail.com');
              
              const passwordField = await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/edtPassword');
              await passwordField.waitForDisplayed({ timeout: 5000 });
               await passwordField.setValue('blubirch123');
               const loginButton = await driver.$('id=com.blubirch.rims.whirlpoolDemo:id/btnSignIn');
                await loginButton.waitForDisplayed({ timeout: 5000 });
               await loginButton.click();
               const pickandPackBtn =await driver.$('//android.widget.TextView[@resource-id="com.blubirch.rims.whirlpoolDemo:id/itemTV" and @text="Pick & Pack"]');
                await pickandPackBtn.waitForDisplayed({ timeout: 5000 });
               await pickandPackBtn.click();
      
               const requestIDSearch =await driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/edtRequestId"]');
                await requestIDSearch.waitForDisplayed({ timeout: 5000 });
               await requestIDSearch.click();
               await requestIDSearch.setValue(pickupReqId);
               const  packReq=await driver.$('//androidx.recyclerview.widget.RecyclerView[@resource-id="com.blubirch.rims.whirlpoolDemo:id/rvItemList"]/android.view.ViewGroup[1]');
                await packReq.waitForDisplayed({ timeout: 5000 });
               await packReq.click();
              const scanBoxId= await driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/editText" and @text="Scan Box ID"]');
               await scanBoxId.waitForDisplayed({ timeout: 5000 });
              await scanBoxId.setValue(tagId);
              const scaTagIdd=await driver.$('//android.widget.EditText[@resource-id="com.blubirch.rims.whirlpoolDemo:id/editText" and @text="Scan Tag/Box Id"]');
               await scaTagIdd.waitForDisplayed({ timeout: 5000 });
              await scaTagIdd.setValue(tagId);
              const arrowBtn3=await driver.$('//android.widget.Button[@resource-id="com.blubirch.rims.whirlpoolDemo:id/btnPack"]');
               await arrowBtn3.waitForDisplayed({ timeout: 5000 });
              await arrowBtn3.click();
              const submitBtn = await driver.$('//android.widget.Button[@resource-id="com.blubirch.rims.whirlpoolDemo:id/btnLeft"]');
              await submitBtn.waitForDisplayed({ timeout: 5000 });
              await submitBtn.click();
              const complteRequest=await driver.$('//android.widget.Button[@resource-id="com.blubirch.rims.whirlpoolDemo:id/btnCompleteRequest"]');
               await complteRequest.waitForDisplayed({ timeout: 5000 });
              await complteRequest.click();
      
               const packConfrmMsgElem = await driver.$('//android.widget.TextView[@resource-id="com.blubirch.rims.whirlpoolDemo:id/md_text_message"]').getText();
               //await packConfrmMsgElem.waitForExist({ timeout: 5000 });
               console.log("Packaging confirm message:", packConfrmMsgElem);
               const okBtnInPickup = await driver.$('//android.widget.Button[@resource-id="com.blubirch.rims.whirlpoolDemo:id/md_button_positive"]');
               await okBtnInPickup.click();
      });
      });
      
      test('12-Update Dispatch Details', async({page})=>{
          test.setTimeout(60000);
          await page.goto('https://rims-demo.blubirch.com/', {timeout: 80000});
          await page.getByRole('textbox', { name: 'Enter email ID/phone number/' }).click();
          await page.getByRole('textbox', { name: 'Enter email ID/phone number/' }).fill('dava_admin');
          await page.getByRole('textbox', { name: 'Enter Password' }).click();
          await page.getByRole('textbox', { name: 'Enter Password' }).fill('blubirch@123');
          await page.getByRole('button', { name: 'Login' }).click();
          await page.getByText('RIMS').click();
      
      
          const dispatchModule=page.locator("(//span[text()='Dispatch'])[1]");
          await dispatchModule.click();
          const pendingDispatchTab=page.locator("//span[text()='Pending Dispatch']");
          await pendingDispatchTab.click();
          const checkBox=page.locator("(//tr[@class='v-data-table__tr']/td)[1]");
         await page.waitForTimeout(3000);
         await checkBox.click();
         const updateDispatchBtn=page.locator("//span[text()='Update Dispatch ']");
         await updateDispatchBtn.click();
         await page.getByLabel("ORD Number").fill("ORRD09483");
         const modeDropdown=page.locator("(//div[@class='v-field__append-inner']/i)[5]");
         await modeDropdown.click();
         await page.locator("//div[text()='Dispatch']").click();
         const lpDropdown=page.locator("(//div[@class='v-field__append-inner']/i)[6]");
        await lpDropdown.click();
        await page.getByText("Nagaraj logistics (123456789)").click();
        await page.getByLabel("Vehicle Number").fill("KA0987843");
        await page.getByLabel("STN").fill(ts);
        page.waitForTimeout(2000);
        const fileInput = page.locator('//input[@type="file"]');
      await fileInput.setInputFiles('C:\\Users\\Blubirch.DESKTOP-EN2LGLN\\Pictures\\img7.jpg');
      
      
        // Set the file(s) to upload
        //await fileChooser.setFiles('C:\\Users\\Blubirch.DESKTOP-EN2LGLN\\Pictures\\img7.jpg');
        await page.waitForTimeout(3000);
        await page.locator("//span[text()='Submit']").click();
        const confMsg=page.locator("//div[@class='v-card-text text-center']").textContent();
        console.log('dispatched', confMsg);
        await page.locator("//span[text()='Ok']").click();
      
        console.log('****************Successfully Executed********************');
      });
