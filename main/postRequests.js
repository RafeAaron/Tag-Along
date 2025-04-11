import {addUser, changePassword, getID, getIDFromUsername} from "./db.js"
import { initiatePayment, addUserAccount } from "./paymentSystem.js";

export async function addUserToDatabase(dbConnection, user_name, first_name, last_name, email, password){

    if(user_name.length == 0)
    {
        return JSON.stringify({"Message": "User Name Not Supplied"});
    }

    if(first_name.length == 0)
    {
        return JSON.stringify({"Message": "First Name Not Supplied"});
    }

    if(last_name.length == 0)
    {
        return JSON.stringify({"Message": "Last Name Not Supplied"});
    }

    if(email.length == 0)
    {
        return JSON.stringify({"Message": "Email Not Supplied"});
    }

    if(password.length == 0)
    {
        return JSON.stringify({"Message": "Password Not Supplied"});
    }

    if(password.length < 9)
    {
        return JSON.stringify({"Message": "Password Not Strong Enough"});
    }

    var result = await addUser(dbConnection, user_name, password, first_name, last_name, email).catch((err) => {
        //console.log(err);
        return err;
    });

    if(result == undefined)
    {
        return JSON.stringify({"Message": "There Was An Error Adding The User To The Database"})
    }else if(result.errno == 1062)
    {
        return JSON.stringify({"Message": "This Email Is Already Taken"});
    }else{
        return JSON.stringify({"User_ID": result.insertId})
    }

}

export async function updateUserPassword(dbConnection, newPassword, ID)
{
    var result = await changePassword(dbConnection,ID, newPassword).catch((err) => {
        console.log(err);
    });

    if(result.affectedRows == 1)
    {
        return JSON.stringify({"message": "Password Changed Successfully"});
    }
    else{
        return JSON.stringify({"message": "No data changed, User might not exist"})
    }

}

export async function initialisePayment(senderID, recieverID, dbConnection, amount, reason)
{

    var result = await initiatePayment(senderID, recieverID, dbConnection, amount, reason).catch((err) => {
        return JSON.stringify({"message": "There was an error initiating a payment"});
    });

    if(result.affectedRows == 1)
    {
        return JSON.stringify({"message": "Payment ID: " + result.insertId});
    }else{
        return JSON.stringify({"message": "Payment initiated failed"});
    }
    
}