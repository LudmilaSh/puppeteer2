Feature: Booking the tickets
    Scenario: Booking one seat on today
        Given user is on page "http://qamid.tmweb.ru/client/index.php"
        When user choose the movie and time on one seat and click booking button and button to get code
        Then user get the code and text "Электронный билет"

    Scenario: Booking two seat on next day
        Given user is on page "http://qamid.tmweb.ru/client/index.php"
        When user choose the next day movie and time on two seats and click booking button and button to get code
        Then user get the code and text "Электронный билет"

    Scenario: Booking taken chair
        Given user is on page "http://qamid.tmweb.ru/client/index.php"
        When user choose the movie and time on taken chair and click on the booking button
        Then button "Забронировать" is inactive