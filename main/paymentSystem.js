import { createConnection } from "./db.js"

export function initiatePayment(senderID, recieverID, dbConnection, amount, reason, dateCompleted)
{

    return new Promise((resolve, reject) => {


        dbConnection.query(`INSERT INTO payments VALUES(0, ?, ?, ?, ?, ?, ?)`, [senderID, recieverID, amount, reason, "Initiated", dateCompleted], (error, result, fields) => {

            if(error) reject(error);

            resolve(result);

        })

    })

}

export function addUserAccount(userID, amount, dbConnection)
{

    let date = new Date();
    var value = date.getFullYear() + "-" + Number(date.getMonth() + 1 ) + "-" + Number(date.getDate());

    return new Promise((resolve, reject) => {

        dbConnection.query(`INSERT INTO accounts VALUES(0, ?, ?, ?, ?)`, [userID, amount, value, value], (error, result, fields) => {
            if(error) reject(error);
            resolve(result);
        })

    })

}

export function getUserAmount(userID, dbConnection)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`SELECT * FROM accounts WHERE userID = ?`, [userID], (err, result, fields) => {
            if(err) reject(err);
            resolve(result);
        })
    })

}

export function availableUserFunds(userID, dbConnection)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`SELECT amount from accounts WHERE userID = ?`, [userID], (err, result, fields) => {
            if(err) reject(err)
            resolve(result)
        })
    })

}