#1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
#2. Enter Username 'Admin'
#3. Enter Password 'admin123'
#4. Click 'Login'
#5. Click 'Admin' in the left menu
#6. Select User Role 'Admin'
#7. Click 'Search'
# This feature file steps are already covered in TC_ADM_001_UserManagement.feature file. So, this feature steps 
#are not required to implement just we can change the variables and use the TC_ADM_001_UserManagement.feature realted steps file   .

Feature: Admin User Management
    Background: 
        When Enter Username as "Admin" and Password as "admin123" and Click on login button
        
    Scenario: Searching ESS user in user management
        Then Click on "Admin" in the left menu
        And Select User Role 'ESS'
        And Click on Search button
        And Verify that all the users with 'ESS' role and matching
        