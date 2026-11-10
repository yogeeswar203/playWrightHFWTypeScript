#1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
#2. Enter Username 'Admin'
#3. Enter Password 'admin123'
#4. Click 'Login'
#5. Click 'Leave'
#6. Click 'Entitlements' > 'Add Entitlements'
#7. Enter Employee Name
#8. Select Leave Type
#9. Enter Entitlement '5'
#10. Click 'Save'
#11. Click 'Confirm' in dialog

#@e2e
Feature: Verify the search functionality in the Leave page of OrangeHRM
    Background: 
        When Enter Username as "Admin" and Password as "admin123" and Click on login button


Scenario: Validate the Entitlements by adding new one
    When I click on the "Leave" from the left panel
    When User click on Entitlements and Add Entitlements
    And  User fills the require data while adding Entitlement "5"
    And  User click on save button
    And User accept the message and added new entitlement details are displayed







