#"1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
#"2. Enter Username 'Admin'
#"3. Enter Password 'admin123'
#"4. Click 'Login'
#"5. Click 'Assign Leave' in the Quick Launch widget"

@sanity
Feature: Verify the user dropdown options on the OrangeHRM dashboard
    Background: 
        When Enter Username as "Admin" and Password as "admin123" and Click on login button

  Scenario: User logs in and clicks on the Assign Leave option in the Quick Launch widget
    When I click on the "Apply Leave" option in the Quick Launch widget
    Then I should be redirected to the "Apply Leave" page