#1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
#2. Enter Username 'Admin'
#3. Enter Password 'admin123'
#4. Click 'Login'
#5. Click 'Leave'
#6. Click 'Search'

@e2e
Feature: Verify the search functionality in the Leave page of OrangeHRM
    Background: 
        When Enter Username as "Admin" and Password as "admin123" and Click on login button

  Scenario: User logs in and searches for an existing employee in the Leave page
    When I click on the "Leave" from the left panel
    And I click on the Search button
    Then I should see the search results for the leave details with default search criteria