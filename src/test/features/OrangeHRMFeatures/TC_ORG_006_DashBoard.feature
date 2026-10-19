#1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
#2. Enter Username 'Admin'
#3. Enter Password 'admin123'
#4. Click 'Login'
#5. Observe the left side menu#

Feature: Verify the left side menu options on the OrangeHRM dashboard
    Background: 
        When Enter Username as "Admin" and Password as "admin123" and Click on login button

  Scenario: User logs in and verifies the left side menu options
    Then I should see the left side menu with the following options:
    |Admin|
    |PIM|
    |Leave|
    |Time|
    |Recruitment|
    |My Info|
    |Performance|
    |Dashboard|
    |Directory|
    |Maintenance|
    |Claim|
    |Buzz|   