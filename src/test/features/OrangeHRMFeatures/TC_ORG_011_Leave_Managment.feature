#1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
#2. Enter Username 'Admin'
#3. Enter Password 'admin123'
#4. Click 'Login'
#5. Click 'Leave' in the left menu

# 6. able to click on Apply

#@e2e
Feature: Verify the search functionality in the Leave page of OrangeHRM
    Background: 
        When Enter Username as "Admin" and Password as "admin123" and Click on login button


Scenario: User is able to clik on apply button
    When I click on the "Leave" from the left panel
    And I click on the Apply button from the top menu
    And verify that "No Leave Types with Leave Balance" text has been displayed






