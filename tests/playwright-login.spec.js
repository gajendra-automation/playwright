// playwright-login.spec.js
// Automated Playwright test script for login page with assertions

const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://uat-docker.blubirch.com:3870/';
const VALID_USERNAME = 'dava_admin'; // Replace with valid username
const VALID_PASSWORD = 'blubirch@123'; // Replace with valid password
const INVALID_USERNAME = 'invalid_user';
const INVALID_PASSWORD = 'invalid_pass';

// Selectors (update if needed)
const USERNAME_SELECTOR = 'input[placeholder*="Email ID"], input[placeholder*="User ID"], input[placeholder*="Phone Number"]';
const PASSWORD_SELECTOR = 'input[type="password"]';
const LOGIN_BUTTON_SELECTOR = '//span[text()="Login"]';
const FORGOT_PASSWORD_LINK = 'text=Forgot Password?';

// Helper: Login action
async function login(page, username, password) {
  await page.fill(USERNAME_SELECTOR, username);
  await page.fill(PASSWORD_SELECTOR, password);
  await page.click(LOGIN_BUTTON_SELECTOR);
}

test.describe('Login Page', () => {
  test('should display all login elements', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator(USERNAME_SELECTOR)).toBeVisible();
    await expect(page.locator(PASSWORD_SELECTOR)).toBeVisible();
    await expect(page.locator).toBeVisible();
    await expect(page.locator(FORGOT_PASSWORD_LINK)).toBeVisible();
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.goto(BASE_URL);
    await login(page, VALID_USERNAME, VALID_PASSWORD);
    // Assertion: Should redirect to dashboard/home (update selector as needed)
    await expect(page).not.toHaveURL(BASE_URL);
    // Optionally, check for dashboard element
    // await expect(page.locator('selector-for-dashboard')).toBeVisible();
  });

  test('should show error for invalid username', async ({ page }) => {
    await page.goto(BASE_URL);
    await login(page, INVALID_USERNAME, VALID_PASSWORD);
    // Assertion: Error message visible
    await expect(page.locator('text=Invalid credentials')).toBeVisible();
    await expect(page).toHaveURL(BASE_URL);
  });

  test('should show error for invalid password', async ({ page }) => {
    await page.goto(BASE_URL);
    await login(page, VALID_USERNAME, INVALID_PASSWORD);
    await expect(page.locator('text=Invalid credentials')).toBeVisible();
    await expect(page).toHaveURL(BASE_URL);
  });

  test('should show error for both fields invalid', async ({ page }) => {
    await page.goto(BASE_URL);
    await login(page, INVALID_USERNAME, INVALID_PASSWORD);
    await expect(page.locator('text=Invalid credentials')).toBeVisible();
    await expect(page).toHaveURL(BASE_URL);
  });

  test('should show validation for empty username', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill(PASSWORD_SELECTOR, VALID_PASSWORD);
    await page.click(LOGIN_BUTTON_SELECTOR);
    await expect(page.locator('text=Username required')).toBeVisible();
    await expect(page).toHaveURL(BASE_URL);
  });

  test('should show validation for empty password', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill(USERNAME_SELECTOR, VALID_USERNAME);
    await page.click(LOGIN_BUTTON_SELECTOR);
    await expect(page.locator('text=Password required')).toBeVisible();
    await expect(page).toHaveURL(BASE_URL);
  });

  test('should show validation for both fields empty', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click(LOGIN_BUTTON_SELECTOR);
    await expect(page.locator('text=Username required')).toBeVisible();
    await expect(page.locator('text=Password required')).toBeVisible();
    await expect(page).toHaveURL(BASE_URL);
  });

  test('should navigate to forgot password page', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click(FORGOT_PASSWORD_LINK);
    // Assertion: Should navigate to forgot password page (update selector as needed)
    await expect(page).not.toHaveURL(BASE_URL);
    // Optionally, check for recovery form
    // await expect(page.locator('selector-for-recovery-form')).toBeVisible();
  });

  test('should allow tab navigation', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.keyboard.press('Tab');
    await expect(page.locator(USERNAME_SELECTOR)).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator(PASSWORD_SELECTOR)).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator(LOGIN_BUTTON_SELECTOR)).toBeFocused();
  });
});
