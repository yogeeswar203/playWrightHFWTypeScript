#1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
#2. Enter Username 'Admin'
#3. Enter Password 'admin123'
#4. Click 'Login'
#5. Click 'Admin' in the left menu
#6. Select User Role 'Admin'
#7. Click 'Search'

@sanity @e2e
Feature: Admin User Management
    Background: 
        When Enter Username as "Admin" and Password as "admin123" and Click on login button
        
    Scenario: Searching Admin in user management
        Then Click on "Admin" in the left menu
        And Select User Role 'Admin'
        And Click on Search button
        And Verify that all the users with 'Admin' role and matching
        