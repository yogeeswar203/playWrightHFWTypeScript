#1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
#2. Enter Username 'Admin'
#3. Enter Password 'admin123'
#4. Click 'Login'
#5. Click 'Admin'
#6. Click '+ Add'
#7. Click 'Save' without entering data
Feature: Admin User Management
    Background: 
        When Enter Username as "Admin" and Password as "admin123" and Click on login button
        
    Scenario: Validation of mandatory fields while adding new user
        Then Click on "Admin" in the left menu
        And Click on Add button 
        And Click on save button without entering any data
        Then Verify that the error messages are displayed for mandatory fields
        