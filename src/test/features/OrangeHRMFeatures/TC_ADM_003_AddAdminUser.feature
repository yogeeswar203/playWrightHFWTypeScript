##1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
##2. Enter Username 'Admin'
##3. Enter Password 'admin123'
##4. Click 'Login'
##5. Click 'Admin'
##6. Click '+ Add'
##7. Select User Role 'ESS'
##8. Enter Employee Name (select from autocomplete)
##9. Select Status 'Enabled'
##10. Enter a unique Username
##11. Enter Password 'Test@1234' and the same Confirm Password
##12. Click 'Save'   .
@sanity @e2e
Feature: Admin User Management
    Background: 
        When Enter Username as "Admin" and Password as "admin123" and Click on login button
        
    Scenario: Adding new user with valid data
        Then Click on "Admin" in the left menu
        And Click on Add button 
        And Fill all the required fields with valid data and click on save button
        Then Verify that the user is added successsfully in the user management
        