Feature: Orange HRM login Page
    Background:
        Given User is able to navigate to login paege
    
    Scenario: Orange HRM login functionality
        And User enter the user name as "admin"
        And user enter the password as "admin123"
        And user click on the login button
        Then user is able to see the admin home Page