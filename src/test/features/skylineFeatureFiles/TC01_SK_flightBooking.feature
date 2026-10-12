#Steps
# 1. Pick From and To from the autocomplete
# 2.Choose a date
# 3.Search
# 4.Select a flight and fare
# 4.Enter passengers, choose seats, pay


Feature: Flight booking on skyline application positive flow
    Background:
    
    Scenario: Flight Booking functionality
        Given User is able to navigate to skyline flight search page
        Then Select from city as "Bengaluru" and to City as "Chenna"
        And select Depature date as first displayed data
        And Select Cabin as "Business"
        Then Click on search flight button
        Then Validate the flight counts are matching
        And select fastest flight and fare
        



        