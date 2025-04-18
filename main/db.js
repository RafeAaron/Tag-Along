const sqlData = require("mysql2");

const databaseHost = "localhost"
const databasePort = "3306"
const passwordDb = "Stuart@2024"
const databaseName = "TagAlong"

async function addUser(dbConnection, username, password, first_name, last_name, email, role)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`INSERT INTO User VALUES(0, ?, ?, ?, ?, ?, ?)`, [email, first_name, last_name, username, password, role],(err, result) => {
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

async function addRating(dbConnection, user_id, rating, comment, date)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`INSERT INTO Rating VALUES(0, ?, ?, ?, ?)`, [user_id, rating, comment, date],(err, result) => {
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

async function addRide(dbConnection, start_location, end_location, current_location_x, current_amount, number_of_passengers)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`INSERT INTO RidesInProgress VALUES(0, ?, ?, ?, ?, ?, ?)`, [start_location, end_location, current_location_x, current_location_y, current_amount, number_of_passengers],(err, result) => {
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

async function addDriver(dbConnection, id, car_model, number_plate, color, type)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`INSERT INTO Driver VALUES(?, ?, ?, ?, ?)`, [id, car_model, number_plate, color, type],(err, result) => {
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

async function addUnverifiedBooking(dbConnection, user_id, start_location, end_location, date, initial_amount, time)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`INSERT INTO Bookings_UnVerified VALUES(0, ?, ?, ?, ?, ?, ?)`, [user_id, start_location, end_location, date, initial_amount, time],(err, result) => {
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
    addRating
};