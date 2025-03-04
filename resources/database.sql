-- This file creates a database called TagAlong that can be used to store and manipulate user data.

CREATE DATABASE IF NOT EXISTS TagAlong;

-- Use the database TagAlong
USE TagAlong;

-- Create a User Table to store user data
CREATE TABLE IF NOT EXISTS User(
    id int AUTO_INCREMENT PRIMARY KEY,
    email varchar(60) UNIQUE,
    first_name varchar(30),
    last_name varchar(30),
    user_name varchar(30),
    password varchar(30)
);

INSERT INTO User VALUES(0, "rafeaaron21@gmail.com", "Rafe", "Aaron", "@rafeaaron23", "Arthur@2025");

CREATE TABLE IF NOT EXISTS resetPasswordCodes(
    id int PRIMARY KEY AUTO_INCREMENT,
    resetCode varchar(7),
    userID int,
    FOREIGN KEY(userID)
    REFERENCES User(id)
);

INSERT INTO resetPasswordCodes VALUES(0, "2437835", 1);