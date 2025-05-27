const sqlData = require("mysql2");

const databaseHost = "localhost"
const databasePort = "3306"
const passwordDb = "Stuart@2024"
const databaseName = "TagAlong"

async function addUser(dbConnection, username, password, first_name, last_name, email, role, age, gender)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`INSERT INTO User VALUES(0, ?, ?, ?, ?, ?, ?, ?, ?)`, [email, first_name, last_name, username, age, gender, password, role],(err, result) => {
            if(err)
            {
                console.log(err);
                reject(err);
            }else
            {
                resolve(result);
            }
        });
    })
    

}

async function getPassengersRequestingRide(dbConnection, ride_id)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`SELECT * FROM RequestToJoinRide WHERE ride_id = ?`, [ride_id],(err, result) => {
            if(err)
            {
                console.log(err);
                reject(JSON.stringify({"Error": err}));
            }else
            {
                resolve(JSON.stringify({"Passengers": result}));
            }
        });
    })
    

}

async function addRequestToJoinRide(dbConnection, user_id, ride_id, current_location_x, current_location_y)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`INSERT INTO RequestToJoinRide VALUES(0, ?, ?, ?, ?)`, [ride_id, user_id, current_location_x, current_location_y],(err, result) => {
            if(err)
            {
                console.log(err);
                reject(err);
            }else
            {
                resolve(result);
            }
        });
    })
    

}

async function addPassenger(dbConnection, user_id, ride_id)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`INSERT INTO Passengers VALUES(?, ?)`, [user_id, ride_id],(err, result) => {
            if(err)
            {
                console.log(err);
                reject(err);
            }else
            {
                resolve(result);
            }
        });
    })
    

}

async function addRating(dbConnection, user_id, ride_id, rating, comment, date)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`INSERT INTO Rating VALUES(0, ?, ?, ?, ?, ?)`, [user_id, ride_id, rating, comment, date],(err, result) => {
            if(err)
            {
                console.log(err);
                reject(err);
            }else
            {
                resolve(result);
            }
        });
    })
    

}

async function addRide(dbConnection, start_location, end_location, current_location_x ,current_location_y, route, current_amount, number_of_passengers)
{

    let date = new Date();

    let start_time = "" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let status = "active";

    return new Promise((resolve, reject) => {
        dbConnection.query(`INSERT INTO Rides VALUES(0, ?, ?, ?, ?, ?, ?, ?, ?, 'N/A', ?)`, [start_location, end_location, current_location_x, current_location_y, route, current_amount, number_of_passengers, start_time, status],(err, result) => {
            if(err)
            {
                console.log(err);
                reject(err);
            }else
            {
                resolve(result);
            }
        });
    })
    

}

async function addLocation(dbConnection, name, min_x, min_y, max_x, max_y)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`INSERT INTO Location VALUES(0, ?, ?, ?, ?, ?)`, [name, min_x, min_y, max_x, max_y],(err, result) => {
            if(err)
            {
                console.log(err);
                reject(err);
            }else
            {
                resolve(result);
            }
        });
    })
    

}

async function addDriver(dbConnection, user_id, car_model, number_plate, color, type)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`INSERT INTO Driver VALUES(0, ?, ?, ?, ?, ?)`, [user_id, car_model, number_plate, color, type],(err, result) => {
            if(err)
            {
                console.log(err);
                reject(err);
            }else
            {
                resolve(result);
            }
        });
    })
    

}

async function addUnverifiedBooking(dbConnection, user_id, start_location, end_location, date, time)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`INSERT INTO Bookings_UnVerified VALUES(0, ?, ?, ?, ?, ?, ?)`, [user_id, start_location, end_location, date, 4500, time],(err, result) => {
            if(err)
            {
                //console.log(err);
                reject(err);
            }else
            {
                resolve(result);
            }
        });
    })
    

}

async function verifyBooking(dbConnection, driver_id, unverified_booking_id)
{

    console.log(typeof(driver_id));

    return new Promise((resolve, reject) => {
        dbConnection.query(`INSERT INTO Bookings VALUES(0, ?, ?)`, [driver_id, unverified_booking_id],(err, result) => {
            if(err)
            {
                console.log(err);
                reject(err);
            }else
            {
                resolve(result);
            }
        });
    })
    

}

async function retrieveResetCode(dbConnection, IdCode)
{

    console.log(IdCode);
    return new Promise((resolve, reject) =>{
        dbConnection.query(`SELECT resetCode FROM resetPasswordCodes WHERE userID = ?`, [IdCode], (err, result) => {
            if(err)
            {
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })

}

async function getIDFromUsername(dbConnection, userName)
{
    return new Promise((resolve, reject) => {

        dbConnection.query(`SELECT id FROM User WHERE user_name = ?`, [userName], (err, result) => {

            if(err)
            {
                reject(err);
            }
            else{
                resolve(result);
            }
        })

    });
}

async function getID(dbConnection, emailAddress)
{
    return new Promise((resolve, reject) => {

        dbConnection.query(`SELECT id FROM User WHERE email = ?`, [emailAddress], (err, result) => {

            if(err)
            {
                reject(err);
            }
            else{
                resolve(result);
            }
        })

    });
}

async function getUser(dbConnection, username, password)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`SELECT * FROM User WHERE user_name = ? AND password = ?`, [username, password], (err, result) => {

            if(err){
                reject(err);
            }
            else{
                
                resolve(result);
            }
    
        })
    })
    
}

async function getUserUsingUserName(dbConnection, username)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`SELECT * FROM User WHERE user_name = ?`, [username], (err, result) => {

            if(err){
                reject(err);
            }
            else{
                console.log(result)
                resolve(JSON.stringify({"User":result}));
            }
    
        })
    })
    
}

async function getUserFromID(dbConnection, user_id)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`SELECT * FROM User WHERE id = ?`, [user_id], (err, result) => {

            if(err){
                reject(err);
            }
            else{
                
                resolve(result);
            }
    
        })
    })
    
}

async function getBookings(dbConnection, user_id)
{

    return new Promise((resolve, reject) => {

        dbConnection.query(`SELECT * FROM Bookings_UnVerified WHERE user_id = ?`, [user_id],(err, result) => {
            if(err)
            {
                console.log(err);
                reject(err);
            }else
            {
                //console.log(result)
                resolve(result);
            }
        });
    })
    

}

async function getVerifiedBookings(dbConnection, user_id)
{

    return new Promise((resolve, reject) => {

        dbConnection.query(`SELECT * FROM Bookings LEFT JOIN Bookings_UnVerified ON Bookings.unverified_booking_id = Bookings_UnVerified.unverified_booking_id WHERE user_id = ?`, [user_id],(err, result) => {
            if(err)
            {
                console.log(err);
                reject(err);
            }else
            {
                //console.log(result)
                resolve(result);
            }
        });
    })
    

}


async function getDriver(dbConnection, number_plate)
{

    return new Promise((resolve, reject) => {

        dbConnection.query(`SELECT * FROM Driver WHERE number_plate = ?`, [number_plate],(err, result) => {
            if(err)
            {
                console.log(err);
                reject(err);
            }else
            {
                //console.log(result)
                resolve(result);
            }
        });
    })
    

}

async function getAverageUserRating(dbConnection, user_id)
{

    return new Promise((resolve, reject) => {

        dbConnection.query(`SELECT AVG(rating) AS user_rating FROM Rating WHERE user_id = ?`, [user_id],(err, result) => {
            if(err)
            {
                console.log(err);
                reject(err);
            }else
            {
                //console.log(result)
                resolve(result);
            }
        });
    })
    

}

async function passengersInRide(dbConnection, ride_id)
{

    return new Promise((resolve, reject) => {

        dbConnection.query(`SELECT * FROM Passengers WHERE ride_id = ?`, [ride_id],(err, result) => {
            if(err)
            {
                console.log(err);
                reject(err);
            }else
            {
                //console.log(result)
                resolve(result);
            }
        });
    })
    

}

async function getAllActiveRides(dbConnection)
{

    return new Promise((resolve, reject) => {

        dbConnection.query(`SELECT * FROM Rides WHERE status = 'active'`,(err, result) => {
            if(err)
            {
                console.log(err);
                reject(err);
            }else
            {
                resolve(JSON.stringify({"rides": result}));
            }
        });
    })
}

async function isDriverInRide(dbConnection, user_id)
{

    return new Promise((resolve, reject) => {

        dbConnection.query(`SELECT * FROM Passengers WHERE user_id = ?`, [user_id] ,(err, result) => {
            if(err)
            {
                console.log(err);
                reject(JSON.stringify({"error": "failed to get driver information " + err}));
            }else
            {
                if(result.length == 0)
                {
                    resolve(JSON.stringify({"result":"false"}));
                }else{
                    resolve(JSON.stringify({"result":"true", "ride_id":result[0].ride_id}));
                }
                
            }
        });
    })
}

async function passengerNumbers(dbConnection, ride_id)
{

    return new Promise((resolve, reject) => {

        dbConnection.query(`SELECT * FROM Passengers WHERE ride_id = ?`, [ride_id] ,(err, result) => {
            if(err)
            {
                console.log(err);
                reject(JSON.stringify({"error": "failed to get trip information " + err}));
            }else
            {
                resolve(JSON.stringify({"number_Of_Passengers": result.length}));
                
                
            }
        });
    })
}

async function getLocation(dbConnection, location_id)
{

    return new Promise((resolve, reject) => {

        dbConnection.query(`SELECT * FROM Location WHERE location_id = ?`, [location_id],(err, result) => {
            if(err)
            {
                console.log(err);
                reject(err);
            }else
            {
                //console.log(result)
                resolve(result);
            }
        });
    })
    

}

async function getRidesById(dbConnection, ride_id)
{

    return new Promise((resolve, reject) => {

        dbConnection.query(`SELECT * FROM Rides WHERE ride_id = ? AND status = 'active'`, [ride_id],(err, result) => {
            if(err)
            {
                console.log(err);
                reject(err);
            }else
            {
                //console.log(result)
                resolve(result);
            }
        });
    })
    

}

async function getRidesByStartingLocation(dbConnection, starting_location)
{

    return new Promise((resolve, reject) => {

        dbConnection.query(`SELECT * FROM Rides WHERE start_location = ? AND status = 'active'`, [starting_location],(err, result) => {
            if(err)
            {
                console.log(err);
                reject(err);
            }else
            {
                //console.log(result)
                resolve(result);
            }
        });
    })
    

}

async function getDriverUsingUserId(dbConnection, user_id)
{

    return new Promise((resolve, reject) => {

        dbConnection.query(`SELECT * FROM Driver WHERE user_id = ?`, [user_id],(err, result) => {
            if(err)
            {
                console.log(err);
                reject(err);
            }else
            {
                //console.log(result)
                resolve(result);
            }
        });
    })
    

}

async function getUserAccount(dbConnection, user_id)
{

    return new Promise((resolve, reject) => {

        dbConnection.query(`SELECT * FROM accounts WHERE userID = ?`, [user_id],(err, result) => {
            if(err)
            {
                console.log(err);
                reject(err);
            }else
            {
                //console.log(result)
                resolve(result);
            }
        });
    })
    

}

async function getRidesThroughLocation(dbConnection, location_id)
{

    return new Promise((resolve, reject) => {

        dbConnection.query(`SELECT * FROM Rides WHERE route LIKE '%?%' AND status = 'active'`, [location_id],(err, result) => {
            if(err)
            {
                console.log(err);
                reject(err);
            }else
            {
                //console.log(result)
                resolve(result);
            }
        });
    })
    

}

async function getRidesByEndingLocation(dbConnection, ending_location)
{

    return new Promise((resolve, reject) => {

        dbConnection.query(`SELECT * FROM Rides WHERE end_location = ? AND status = 'active'`, [ending_location],(err, result) => {
            if(err)
            {
                console.log(err);
                reject(err);
            }else
            {
                //console.log(result)
                resolve(result);
            }
        });
    })
    

}

async function createResetCode(dbConnection, id)
{
    return new Promise((resolve, reject) => {
        dbConnection.query(`INSERT INTO resetPasswordCodes(id, resetCode, userID) VALUES(0, ?, ?)`, [(Math.random() * 1000000) | 0, id], (err, result) => {

            if(err)
            {
                reject(false);
            }
            else
            {
                resolve(true)
            }

        });
    });
}

async function changePassword(dbConnection, id, newPassword)
{
    return new Promise((resolve, reject) => {
        dbConnection.query(`UPDATE User SET password = ? WHERE id = ?`, [newPassword, id] ,(err, result) => {
            if(err)
            {
                reject(err);
            }else
            {
                resolve(result);
            }
        });
    });

}

async function createConnection()
{

    const databaseConnection = sqlData.createConnection(
        {host: "localhost",
        password: "Stuart@2024",
        port: "3306",
        user: "root",
        database: "TagAlong"
    }
    );

    databaseConnection.connect( (err) => {

        if(err) {
            console.log(err);
            return -1;
        }

        console.log("Connected");
    });

    return databaseConnection;
}

async function closeConnection(databaseConnection)
{

    databaseConnection.destroy();

}

async function updateLocationById(dbConnection, location_id, name, min_x, min_y, max_x, max_y)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`UPDATE Location SET name = ?, min_x = ?, min_y = ?, max_x = ?, max_y = ? WHERE location_id = ?`, [name, min_x, min_y, max_x, max_y, location_id] ,(err, result) => {
            if(err)
            {
                reject(err);
            }else
            {
                resolve(result);
            }
        });
    });

}

async function updateLocationByName(dbConnection, name, min_x, min_y, max_x, max_y)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`UPDATE Location SET min_x = ?, min_y = ?, max_x = ?, max_y = ? WHERE name = ?`, [min_x, min_y, max_x, max_y, name] ,(err, result) => {
            if(err)
            {
                reject(err);
            }else
            {
                resolve(result);
            }
        });
    });

}

async function updatePassengerNumberInRide(dbConnection, ride_id, number_of_passengers)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`UPDATE Rides SET number_of_passengers = ? WHERE ride_id = ?`, [number_of_passengers, ride_id] ,(err, result) => {
            if(err)
            {
                reject(err);
            }else
            {
                resolve(result);
            }
        });
    });

}

async function updateRouteInformation(dbConnection, ride_id, route)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`UPDATE Rides SET route = ? WHERE ride_id = ?`, [route, ride_id] ,(err, result) => {
            if(err)
            {
                reject(err);
            }else
            {
                resolve(result);
            }
        });
    });

}

async function updateRideStatus(dbConnection, ride_id, status)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`UPDATE Rides SET status = ? WHERE ride_id = ?`, [status, ride_id] ,(err, result) => {
            if(err)
            {
                reject(err);
            }else
            {
                resolve(result);
            }
        });
    });

}

async function updateRideLocation(dbConnection, ride_id, current_location_x, current_location_y)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`UPDATE Rides SET current_location_x = ?, current_location_y = ? WHERE ride_id = ?`, [current_location_x, current_location_y, ride_id] ,(err, result) => {
            if(err)
            {
                reject(err);
            }else
            {
                resolve(result);
            }
        });
    });

}

async function updateRideEndTime(dbConnection, ride_id, end_time)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`UPDATE Rides SET end_time = ? WHERE ride_id = ?`, [end_time, ride_id] ,(err, result) => {
            if(err)
            {
                reject(err);
            }else
            {
                resolve(result);
            }
        });
    });

}

async function updateDriverDetails(dbConnection, driver_id, car_model, number_plate, color, type)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`UPDATE Driver SET car_model = ?, number_plate = ?, color = ?, type = ? WHERE driver_id = ?`, [car_model, number_plate, color, type, driver_id] ,(err, result) => {
            if(err)
            {
                reject(err);
            }else
            {
                resolve(result);
            }
        });
    });

}

async function addUserAccount(dbConnection, user_id, date_created)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`INSERT INTO accounts VALUES(0, ?, ?, ?, ?)`, [user_id, 0, date_created, date_created] ,(err, result) => {
            if(err)
            {
                reject(err);
            }else
            {
                resolve(result);
            }
        });
    });

}

//["user_id", "email", "first_name", "last_name", "user_name"];
async function updateUserDetails(dbConnection, user_id, email, first_name, last_name, user_name)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`UPDATE User SET email = ?, first_name = ?, last_name = ?, user_name = ? WHERE id = ?`, [email, first_name, last_name, user_name, user_id] ,(err, result) => {
            if(err)
            {
                reject(err);
            }else
            {
                resolve(result);
            }
        });
    });

}

async function updateUserAmount(dbConnection, user_id, amount)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`UPDATE accounts SET amount = ? WHERE userID = ?`, [amount, user_id] ,(err, result) => {
            if(err)
            {
                reject(err);
            }else
            {
                resolve(result);
            }
        });
    });

}

async function updatePaymentDetails(dbConnection, paymentID)
{

    let date = new Date();

    let start_time = "" + date.getDay() + "/" + date.getMonth() + ":" + date.getFullYear();

    return new Promise((resolve, reject) => {
        dbConnection.query(`UPDATE payments SET paymentStatus = ?, dateCompleted = ? WHERE paymentID = ?`, ["Completed", start_time, paymentID] ,(err, result) => {
            if(err)
            {
                reject(err);
            }else
            {
                resolve(result);
            }
        });
    });

}

async function getPaymentsThatMatchId(dbConnection, user_id)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`SELECT * FROM payments WHERE senderID = ? OR recieverID = ? ORDER BY paymentID DESC LIMIT 7`, [user_id, user_id] ,(err, result) => {
            if(err)
            {
                reject(err);
            }else
            {
                resolve(JSON.stringify({"Payments": result}));
            }
        });
    });

}

async function getRideWithUser(dbConnection, user_id)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`SELECT * FROM Passengers WHERE user_id = ?`, [user_id] ,(err, result) => {
            if(err)
            {
                reject(JSON.stringify({"Error":err}));
            }else
            {
                resolve(JSON.stringify({"Users": result}));
            }
        });
    });

}

module.exports = {
    createConnection,
    closeConnection,
    addUser,
    changePassword,
    getUser,
    createResetCode,
    getID,
    retrieveResetCode,
    getIDFromUsername,
    addDriver,
    addUnverifiedBooking,
    verifyBooking,
    addRide,
    addLocation,
    addPassenger,
    addRating,
    getBookings,
    getVerifiedBookings,
    getDriver,
    getAverageUserRating,
    passengersInRide,
    getLocation,
    getRidesById,
    getRidesByStartingLocation,
    getRidesByEndingLocation,
    updateLocationById,
    updateLocationByName,
    updatePassengerNumberInRide,
    updateRideLocation,
    updateDriverDetails,
    updateUserDetails,
    updateRideEndTime,
    updateRouteInformation,
    updateRideStatus,
    getAllActiveRides,
    getRidesThroughLocation,
    getDriverUsingUserId,
    getUserFromID,
    addRequestToJoinRide,
    addUserAccount,
    getUserAccount,
    getPaymentsThatMatchId,
    getUserUsingUserName,
    getPassengersRequestingRide,
    getRideWithUser,
    isDriverInRide,
    passengerNumbers,
    updateUserAmount,
    updatePaymentDetails
};