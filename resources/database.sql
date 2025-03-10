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
INSERT INTO User VALUES(0, "michealronny@gmail.com", "Micheal", "Ronny", "@michealRonny", "michealRonny2024");

CREATE TABLE IF NOT EXISTS resetPasswordCodes(
    id int PRIMARY KEY AUTO_INCREMENT,
    resetCode varchar(7),
    userID int,
    FOREIGN KEY(userID)
    REFERENCES User(id)
);

INSERT INTO resetPasswordCodes VALUES(0, "2437835", 1);

CREATE TABLE IF NOT EXISTS payments(
    paymentID int PRIMARY KEY AUTO_INCREMENT,
    senderID int,
    recieverID int,
    amount int,
    reason varchar(60),
    paymentStatus varchar(15),
    dateCompleted varchar(20),
    FOREIGN KEY(senderID)
    REFERENCES User(id),
    FOREIGN KEY(recieverID)
    REFERENCES User(id)
);

INSERT INTO payments VALUES(0, 1, 2, 200, "Transport Fee", "Initiated", "2024-10-5");

CREATE TABLE IF NOT EXISTS accounts(

    accountID int PRIMARY KEY AUTO_INCREMENT,
    userID int,
    amount int,
    dateCreated varchar(20),
    dateUpdated varchar(20),

    FOREIGN KEY(userID)
    REFERENCES User(id)

);

INSERT INTO accounts VALUES(0, 1, 400, "2024-10-5", "2025-01-23");

