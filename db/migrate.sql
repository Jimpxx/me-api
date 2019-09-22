-- DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    birthday TEXT NOT NULL,
    UNIQUE(email)
);

-- DROP TABLE IF EXISTS reports;
CREATE TABLE IF NOT EXISTS reports (
    week VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    UNIQUE(week)
);
