Feature: Booking the tickets
    Scenario: Booking one seat on today
        Given user is on page "http://qamid.tmweb.ru/client/index.php"
        When user choose the movie and time on tuday
        When user choose seat on 3 row and 3 chair and click on Забронировать button
        Then user get info about seats "3/3"

    Scenario: Booking two seat on next day
        Given user is on page "http://qamid.tmweb.ru/client/index.php"
        When user choose next day, movie and time
        When user choose first seat on 8 row and 6 chair
        When user choose second seat on 8 row and 7 chair and click on Забронировать button
        Then user get text "Вы выбрали билеты:"

    Scenario: Booking taken chair
        Given user is on page "http://qamid.tmweb.ru/client/index.php"
        When user choose taken chair
        Then button Забронировать is inactive