# Create Request Page Test Plan

## Application Overview

This test plan covers the 'Create Request' (Return Creation) page of the Blubirch SAAS application. It includes scenarios for login, navigation, request creation, filtering, searching, and actions on requests. The plan ensures coverage of happy paths, edge cases, and error handling for robust validation of the page's functionality.

## Test Scenarios

### 1. Login and Navigation

**Seed:** `tests/seed.spec.js`

#### 1.1. Successful Login and Navigation to Create Request Page

**File:** `tests/create-request-page/login-and-navigation.spec.js`

**Steps:**
  1. Navigate to the application URL.
  2. Enter valid username and password.
  3. Click the Login button.
  4. Verify successful login and redirection to the dashboard or main page.
  5. Navigate to the 'Return Creation' or 'Create Request' page via navigation menu.

**Expected Results:**
  - User is logged in and lands on the dashboard/main page.
  - User is able to access the 'Create Request' page.

### 2. Request Table Interactions

**Seed:** `tests/seed.spec.js`

#### 2.1. Verify Table Columns and Data Presence

**File:** `tests/create-request-page/table-columns.spec.js`

**Steps:**
  1. On the 'Create Request' page, verify the presence of all expected table columns: CRM Ticket No, Sub Request ID, BB Ticket No., Creation Date/Ageing, Customer/Entity, Item Location Owner, Stage, Request Type, Location, Sub-Request Status, Images, Approval History, Update.
  2. Verify that at least one row of data is present or handle empty state gracefully.

**Expected Results:**
  - All columns are visible and correctly labeled.
  - Table displays data or shows an appropriate empty state message.

#### 2.2. Search Functionality

**File:** `tests/create-request-page/search.spec.js`

**Steps:**
  1. Enter a valid serial number, Tag ID, CRM, or Sub-Req ID in the search box.
  2. Click the search icon or press Enter.
  3. Verify that the table updates to show matching results.

**Expected Results:**
  - Table displays only rows matching the search criteria.

#### 2.3. Filter Functionality

**File:** `tests/create-request-page/filter.spec.js`

**Steps:**
  1. Click the 'Filter' button.
  2. Apply one or more filters (e.g., status, date range, customer/entity).
  3. Verify that the table updates to reflect the applied filters.

**Expected Results:**
  - Table displays only rows matching the filter criteria.

### 3. Request Actions

**Seed:** `tests/seed.spec.js`

#### 3.1. Update Request Action

**File:** `tests/create-request-page/update-action.spec.js`

**Steps:**
  1. Identify a row with an enabled 'Update' button.
  2. Click the 'Update' button.
  3. Verify that the update form/modal appears and is functional.

**Expected Results:**
  - Update form/modal is displayed for the selected request.

#### 3.2. View Request Details

**File:** `tests/create-request-page/view-details.spec.js`

**Steps:**
  1. Identify a row with a 'View' button (if available).
  2. Click the 'View' button.
  3. Verify that the request details are displayed.

**Expected Results:**
  - Request details are shown in a modal or new page.

### 4. Tabs and Statuses

**Seed:** `tests/seed.spec.js`

#### 4.1. Switch Between Tabs

**File:** `tests/create-request-page/tabs.spec.js`

**Steps:**
  1. On the 'Create Request' page, click the 'In Process' tab.
  2. Verify that only 'In Process' requests are shown.
  3. Click the 'On Hold' tab.
  4. Verify that only 'On Hold' requests are shown.

**Expected Results:**
  - Tab content updates to show requests with the selected status.
