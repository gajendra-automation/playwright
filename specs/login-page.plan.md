# Login Page Test Plan

## Application Overview

Test plan for the Blubirch login page at https://uat-docker.blubirch.com:3870/. Covers UI, valid/invalid login, empty fields, and forgot password flow.

## Test Scenarios

### 1. Login Page Suite

**Seed:** `tests/playwright-login.spec.js`

#### 1.1. Verify Login Page Elements

**File:** `tests/playwright-login.spec.js`

**Steps:**
  1. Navigate to https://uat-docker.blubirch.com:3870/
  2. Verify 'Email ID or Phone Number or User ID' field is visible
  3. Verify 'Password' field is visible
  4. Verify 'Forgot Password?' link is visible
  5. Verify 'Login' button is visible

**Expected Results:**
  - All login page elements are visible

#### 1.2. Login with Valid Credentials

**File:** `tests/playwright-login.spec.js`

**Steps:**
  1. Enter valid username and password
  2. Click 'Login'

**Expected Results:**
  - User is redirected to dashboard/home page

#### 1.3. Login with Invalid Credentials

**File:** `tests/playwright-login.spec.js`

**Steps:**
  1. Enter invalid username or password
  2. Click 'Login'

**Expected Results:**
  - Error message is displayed
  - User remains on login page

#### 1.4. Login with Empty Fields

**File:** `tests/playwright-login.spec.js`

**Steps:**
  1. Leave username and/or password empty
  2. Click 'Login'

**Expected Results:**
  - Validation messages are shown for empty fields

#### 1.5. Forgot Password Flow

**File:** `tests/playwright-login.spec.js`

**Steps:**
  1. Click 'Forgot Password?' link

**Expected Results:**
  - User is redirected to password recovery page
