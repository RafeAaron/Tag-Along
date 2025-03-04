import {addUser, changePassword} from "./db.js"

export async function addUserToDatabase(dbConnection, user_name, first_name, last_name, email, password){

    var result = await addUser(dbConnection, user_name, password, first_name, last_name, email).catch((err) => {
        console.log(err);
    });

    if(result.affectedRows == 1){
        return JSON.stringify({"User_ID": result.insertId})
    }else{
        return JSON.stringify({"message": "User was not added to the database"})
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