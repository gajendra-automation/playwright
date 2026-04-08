const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginpage');

test.describe('Login Tests', () => {
  test('Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login("dava_admin", "blubirch@123");
    //await expect(page).toHaveURL(/return-creation/);
  });
});
