const sqlData = require("mysql2");

const databaseHost = "localhost"
const databasePort = "3306"
const passwordDb = "Stuart@2024"
const databaseName = "TagAlong"

async function addUser(dbConnection, username, password, first_name, last_name, email)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`INSERT INTO User VALUES(0, ?, ?, ?, ?, ?)`, [email, first_name, last_name, username, password],(err, result) => {
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

module.exports = {createConnection, closeConnection, addUser, changePassword, getUser, createResetCode, getID, retrieveResetCode};