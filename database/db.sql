CREATE DATABASE paper_administration;

USE paper_administration;

CREATE TABLE users(
    id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    username VARCHAR(16) NOT NULL, 
    password VARCHAR(100) NOT NULL
);