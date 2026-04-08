# Test Plan: Login Page

## 1. Page Load
- Verify login page loads with:
  - "Email ID or Phone Number or User ID" field
  - "Password" field
  - "Forgot Password?" link
  - "Login" button

## 2. Valid Login
- Enter valid credentials
- Click "Login"
- Verify successful login (dashboard or home page loads)

## 3. Invalid Login
- Enter invalid credentials
- Click "Login"
- Verify error message is shown

## 4. Empty Fields
- Leave fields empty
- Click "Login"
- Verify validation messages

## 5. Forgot Password
- Click "Forgot Password?" link
- Verify navigation to password recovery page
