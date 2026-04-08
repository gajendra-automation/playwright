// spec: 1.1. Successful Login and Navigation to Create Request Page
// seed: tests/seed.spec.js

import { test, expect } from '@playwright/test';

test.describe('Login and Navigation', () => {
  test('Successful Login and Navigation to Create Request Page', async ({ page }) => {
    // 1. Navigate to the application URL.
    await page.goto('https://qa-crompton-rims-k8s.blubirch.com/');

    // 2. Enter valid username and password.
    await page.getByRole('textbox', { name: 'Enter email ID/phone number/' }).fill('dava_admin');
    await page.getByRole('textbox', { name: 'Enter Password' }).fill('blubirch@123');

    // 3. Click the Login button.
    await page.getByRole('button', { name: 'Login' }).click();

    // 4. Verify successful login and redirection to the dashboard or main page.
    await expect(page).toHaveURL(/return-creation/);
    // Fallback: Use the second occurrence of 'Return Creation' text, which is visible in the main content
    await expect(page.getByText('Return Creation').nth(1)).toBeVisible();

    // 5. Navigate to the 'Return Creation' or 'Create Request' page via navigation menu.
    // (Already landed on the page after login, so just verify the navigation bar exists)
    // Fix: Target the left navigation drawer specifically by filtering for unique menu text
    await expect(page.getByRole('navigation', { name: '' }).filter({ hasText: 'Tag ID IRD RIA Return' })).toBeVisible();
  });
});
