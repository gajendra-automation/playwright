# Detailed Test Cases: Login Page

## 1. Page Load

### TC1.1: Verify Login Page Elements
- Steps:
  1. Navigate to https://uat-docker.blubirch.com:3870/
- Expected Results:
  - "Email ID or Phone Number or User ID" field is visible
  - "Password" field is visible
  - "Forgot Password?" link is visible
  - "Login" button is visible

## 2. Valid Login

### TC2.1: Login with Valid Credentials
- Steps:
  1. Enter valid user ID/email/phone in the username field
  2. Enter valid password in the password field
  3. Click "Login"
- Expected Results:
  - User is redirected to dashboard/home page
  - No error message is shown

## 3. Invalid Login

### TC3.1: Login with Invalid Username
- Steps:
  1. Enter invalid user ID/email/phone in the username field
  2. Enter valid password in the password field
  3. Click "Login"
- Expected Results:
  - Error message is displayed (e.g., "Invalid credentials")
  - User remains on login page

### TC3.2: Login with Invalid Password
- Steps:
  1. Enter valid user ID/email/phone in the username field
  2. Enter invalid password in the password field
  3. Click "Login"
- Expected Results:
  - Error message is displayed (e.g., "Invalid credentials")
  - User remains on login page

### TC3.3: Login with Both Invalid
- Steps:
  1. Enter invalid user ID/email/phone in the username field
  2. Enter invalid password in the password field
  3. Click "Login"
- Expected Results:
  - Error message is displayed
  - User remains on login page

## 4. Empty Fields

### TC4.1: Login with Empty Username
- Steps:
  1. Leave username field empty
  2. Enter valid password
  3. Click "Login"
- Expected Results:
  - Validation message is shown (e.g., "Username required")
  - User remains on login page

### TC4.2: Login with Empty Password
- Steps:
  1. Enter valid username
  2. Leave password field empty
  3. Click "Login"
- Expected Results:
  - Validation message is shown (e.g., "Password required")
  - User remains on login page

### TC4.3: Login with Both Fields Empty
- Steps:
  1. Leave both fields empty
  2. Click "Login"
- Expected Results:
  - Validation messages are shown for both fields
  - User remains on login page

## 5. Forgot Password

### TC5.1: Forgot Password Link
- Steps:
  1. Click "Forgot Password?" link
- Expected Results:
  - User is redirected to password recovery page

### TC5.2: Password Recovery Workflow
- Steps:
  1. Click "Forgot Password?" link
  2. Enter valid email/user ID/phone
  3. Submit recovery request
- Expected Results:
  - Confirmation message is shown (e.g., "Recovery email sent")

## 6. UI and Accessibility

### TC6.1: Tab Navigation
- Steps:
  1. Use Tab key to navigate through fields and buttons
- Expected Results:
  - All fields and buttons are accessible via keyboard

### TC6.2: Field Labels and Placeholders
- Steps:
  1. Check labels and placeholders for all fields
- Expected Results:
  - Labels and placeholders are clear and descriptive
