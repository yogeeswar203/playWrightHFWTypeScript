#Tick Non-stop, an airline and a departure window
#Sort Fastest

Feature: Flight booking on skyline application positive flow with sorting and filtering
    Background:
    
    Scenario: selecting flight with filters and sorting
        Given User is able to navigate to skyline flight search page
        Then Select from city as "Kolka" and to City as "Goa"
        And select Depature date as first displayed data
        And Select Cabin as "Business"
        And Click on search flight button
        Then Click on "Non-stop" and airline as "IndiGlide" and Depature time "Evening (18–24)"checkbox

        
