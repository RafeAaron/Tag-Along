import { createConnection } from "./db.js"

export function initiatePayment(senderID, recieverID, dbConnection, amount, reason)
{

    let date = new Date();
    var value = date.getFullYear() + "-" + Number(date.getMonth() + 1 ) + "-" + Number(date.getDate());

    return new Promise((resolve, reject) => {


        dbConnection.query(`INSERT INTO payments VALUES(0, ?, ?, ?, ?, ?, ?)`, [senderID, recieverID, amount, reason, "Initiated", value], (error, result, fields) => {

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

export async function getUserAccountDetails(userID, dbConnection)
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

export function updateUserFunds(userID, dbConnection, amount)
{

    return new Promise((resolve, reject) => {
        dbConnection.query(`UPDATE accounts SET amount = ? WHERE userID = ?`, [amount, userID], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });

}