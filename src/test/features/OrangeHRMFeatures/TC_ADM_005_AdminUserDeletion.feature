#1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
#2. Enter Username 'Admin'
#3. Enter Password 'admin123'
#4. Click 'Login'
#5. Click 'Admin'
#6. Search for the user created earlier
#7. Click the Delete (trash) icon
#8. Click 'Yes, Delete' in confirmation dialog

@sanity @e2e
Feature: Admin User Management
    Background: 
        When Enter Username as "Admin" and Password as "admin123" and Click on login button
        
    Scenario: Deletion of an existing user
        Then Click on "Admin" in the left menu
        And Search for the user created earlier
        And Click the Delete trash icon
        And Click 'Yes, Delete' in confirmation dialog