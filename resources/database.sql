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
    password varchar(30),
    role varchar(20)
);

INSERT INTO User VALUES(0, "rafeaaron21@gmail.com", "Rafe", "Aaron", "@rafeaaron23", "Arthur@2025", "traveller/driver");
INSERT INTO User VALUES(0, "michealronny@gmail.com", "Micheal", "Ronny", "@michealRonny", "michealRonny2024", "driver");

CREATE TABLE IF NOT EXISTS Driver(

    driver_id int,
    car_model VARCHAR(60),
    number_plate VARCHAR(15),
    color VARCHAR(20),
    type VARCHAR(15),
    
    FOREIGN KEY(driver_id)
    REFERENCES User(id)

);

INSERT INTO Driver VALUES(2, "Prius", "UAB 874F", "Red", "Family Car");

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

CREATE TABLE IF NOT EXISTS Bookings_UnVerified
(
    unverified_booking_id int PRIMARY KEY AUTO_INCREMENT,
    user_id int,
    start_location VARCHAR(30),
    end_location VARCHAR(30),
    date VARCHAR(20),
    initial_amount INT(8),
    time VARCHAR(20),

    FOREIGN KEY(user_id)
    REFERENCES User(id)
);

INSERT INTO Bookings_UnVerified VALUES(0, 1, "Rwebikona", "Kakooba", "20/10/2025", 4600, "14:35");

CREATE TABLE IF NOT EXISTS Bookings
(
    booking_id int PRIMARY KEY AUTO_INCREMENT,
    unverified_booking_id int,
    driver_id int,

    FOREIGN KEY(driver_id)
    REFERENCES Driver(driver_id),
    FOREIGN KEY(unverified_booking_id)
    REFERENCES Bookings_UnVerified(unverified_booking_id)
);

CREATE TABLE IF NOT EXISTS RidesInProgress
(

    ride_id int PRIMARY KEY AUTO_INCREMENT,
    start_location VARCHAR(60),
    end_location VARCHAR(60),
    current_location_x VARCHAR(60),
    current_location_y VARCHAR(60),
    current_Amount int(8),
    number_of_passengers int(3)

);

CREATE TABLE IF NOT EXISTS Location(
    location_id int PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(60),
    min_x VARCHAR(60),
    min_y VARCHAR(60),
    max_x VARCHAR(60),
    max_y VARCHAR(60)
);

CREATE TABLE IF NOT EXISTS Passengers(

    user_id int,
    ride_id int,

    FOREIGN KEY(passenger_id)
    REFERENCES User(id),

    FOREIGN KEY(ride_id)
    REFERENCES RidesInProgress(ride_id)

);

CREATE TABLE IF NOT EXISTS Rating
(
    rating_id int AUTO_INCREMENT PRIMARY KEY,
    user_id int,
    rating int,
    comment VARCHAR(100),
    date VARCHAR(20)
);

INSERT INTO Rating VALUES(0, 2, 4, "Very Wonderful Ride", "20/08/2025");