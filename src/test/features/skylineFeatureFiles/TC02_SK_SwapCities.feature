#Fill From and To
#Click swap

Feature: Flight booking on skyline application positive flow
    Background:
    
    Scenario: Swap cities functionality
        Given User is able to navigate to skyline flight search page
        Then Select from city as "Bengaluru" and to City as "Chenna"
        And Click on Swap button and Validate cities are swapped
