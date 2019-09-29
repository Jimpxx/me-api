CREATE TABLE IF NOT EXISTS reports ( week VARCHAR(255) NOT NULL, title VARCHAR(255) NOT NULL, text TEXT NOT NULL, UNIQUE(week) );
CREATE TABLE IF NOT EXISTS users ( name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(60) NOT NULL, birthday TEXT NOT NULL, UNIQUE(email) );

-- INSERT INTO users (name, email, password, birthday) VALUES
--     ("Jimmy", "jimmy@test.com", "123", "1989/05/27")
-- ;


INSERT INTO reports (week, title, text) VALUES
    ("kmom01", "Kursmoment 1", "Detta är en text for testning av kursmoment 1"),
    ("kmom02", "Kursmoment 2", "Detta är en text for testning av kursmoment 2")
;
