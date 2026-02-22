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
    const loginpage=new LoginPage(page);
    loginpage.navigate();
  const prdpage =new prdpages(page);
  await prdpage.navigate();
  await prdpage.navigateToPrd();
  const filePath = 'C:/Users/Blubirch.DESKTOP-EN2LGLN/PLAYWRIGHT AUTOMATION/testdata/prd_file.csv';
  await prdpage.uploadprdFile(filePath);
  })


