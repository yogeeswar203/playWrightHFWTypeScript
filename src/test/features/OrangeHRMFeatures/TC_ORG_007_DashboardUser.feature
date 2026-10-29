#1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
#2. Enter Username 'Admin'
#3. Enter Password 'admin123'
#4. Click 'Login'
#5. Click the user name dropdown in the top right corner
@sanity @e2e

Feature: Verify the user dropdown options on the OrangeHRM dashboard
    Background: 
        When Enter Username as "Admin" and Password as "admin123" and Click on login button

  Scenario: User logs in and verifies the user dropdown options
    Then I should see the user dropdown with the following options:
    |About|
    |Support|
    |Change Password|
    |Logout| 