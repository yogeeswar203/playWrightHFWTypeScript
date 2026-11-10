#1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
#2. Enter Username 'Admin'
#3. Enter Password 'admin123'
#4. Click 'Login'
#5. Click 'Leave'
#6. Enter From Date and To Date
#7. Click 'Search'

#@e2e
Feature: Verify the search functionality in the Leave page of OrangeHRM
    Background: 
        When Enter Username as "Admin" and Password as "admin123" and Click on login button


Scenario: Validate the Entitlements by adding new one
    When I click on the "Leave" from the left panel
    And user enters the from date as "2026-10-10" to date as "2026-11-10" 
    







