#1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
#2. Enter Username 'Admin'
#3. Enter Password 'admin123'
#4. Click 'Login'
#5. Click 'Directory'
#6. Type an existing employee name and select from autocomplete
#7. Click 'Search'

@e2e
Feature: Verify the search functionality in the Directory page of OrangeHRM
    Background: 
        When Enter Username as "Admin" and Password as "admin123" and Click on login button

  Scenario: User logs in and searches for an existing employee in the Directory page
    When I click on the "Directory" from the left panel
    And I type an existing "Employee Name" in the search field and select from autocomplete
    And I click on the Search button
    Then I should see the search results for the specified employee