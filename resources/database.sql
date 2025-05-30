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
    age int ,
    gender VARCHAR(15),
    password varchar(30),
    role varchar(20)
);

INSERT INTO User VALUES(0, "edrinehaines2@gmail.com", "Edrine", "Haines", "Edrine", 22 , "Female" ,"edrine2025", "traveller");
INSERT INTO User VALUES(0, "rafeaaron21@gmail.com", "Rafe", "Aaron", "@rafeaaron23", 21 , "Male" , "Arthur@2025", "Traveller/Driver");
INSERT INTO User VALUES(0, "michealronny@gmail.com", "Micheal", "Ronny", "@michealRonny", 24 , "Male" ,"michealRonny2024", "Driver");

CREATE TABLE IF NOT EXISTS Driver(

    id int PRIMARY KEY AUTO_INCREMENT,
    user_id int,
    car_model VARCHAR(60),
    number_plate VARCHAR(15),
    color VARCHAR(20),
    type VARCHAR(15),
    
    FOREIGN KEY(user_id)
    REFERENCES User(id)

);

INSERT INTO Driver VALUES(0, 2, "Prius", "UAB 874F", "Red", "Family Car");
INSERT INTO Driver VALUES(0, 3, "Land Rover", "UBA 768T", "Grey", "Family Car");

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

INSERT INTO payments VALUES(0, 1, 2, 200, "Transport Fee", "Initiated", "N/A");

CREATE TABLE IF NOT EXISTS accounts(

    accountID int PRIMARY KEY AUTO_INCREMENT,
    userID int,
    amount int,
    dateCreated varchar(20),
    dateUpdated varchar(20),

    FOREIGN KEY(userID)
    REFERENCES User(id)

);

INSERT INTO accounts VALUES(0, 1, 400, "5/11/2024", "5/12/2024");
INSERT INTO accounts VALUES(0, 2, 1400, "5/6/2024", "5/6/2024");
INSERT INTO accounts VALUES(0, 3, 3500, "5/7/2024", "5/7/2024");

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
    driver_id int,
    unverified_booking_id int,
    

    FOREIGN KEY(driver_id)
    REFERENCES Driver(id),
    FOREIGN KEY(unverified_booking_id)
    REFERENCES Bookings_UnVerified(unverified_booking_id)
);

CREATE TABLE IF NOT EXISTS Rides
(

    ride_id int PRIMARY KEY AUTO_INCREMENT,
    start_location VARCHAR(60),
    end_location VARCHAR(60),
    current_location_x VARCHAR(60),
    current_location_y VARCHAR(60),
    route VARCHAR(300),
    current_Amount int(8),
    number_of_passengers int(3),
    start_time VARCHAR(10),
    end_time VARCHAR(10),
    status VARCHAR(30)

);

CREATE TABLE IF NOT EXISTS Location(
    location_id int PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) UNIQUE
);

INSERT INTO Location VALUES(0, "Rwebikona");
INSERT INTO Location VALUES(0, "Mbarara University");
INSERT INTO Location VALUES(0, "TASO Village");
INSERT INTO Location VALUES(0, "Kakooba");
INSERT INTO Location VALUES(0, "Kashanyarazi");
INSERT INTO Location VALUES(0, "Boma");
INSERT INTO Location VALUES(0, "MUST Hospital");
INSERT INTO Location VALUES(0, "Amazon Building");

CREATE TABLE IF NOT EXISTS Passengers(

    user_id int,
    ride_id int,

    FOREIGN KEY(user_id)
    REFERENCES User(id),

    FOREIGN KEY(ride_id)
    REFERENCES Rides(ride_id)

); 

CREATE TABLE IF NOT EXISTS RequestToJoinRide(
    request_id int AUTO_INCREMENT PRIMARY KEY,
    ride_id int,
    user_id int,
    current_location_x VARCHAR(40),
    current_location_y VARCHAR(40),

    FOREIGN KEY(user_id)
    REFERENCES User(id),
    FOREIGN KEY(ride_id)
    REFERENCES Rides(ride_id)
);
