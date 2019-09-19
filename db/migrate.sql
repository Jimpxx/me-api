-- DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    birthday TEXT NOT NULL,
    UNIQUE(email)
);