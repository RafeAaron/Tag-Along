import { getUser, createResetCode, getID, retrieveResetCode } from "./db.js";

export function welcomeUser(res)
{
    res.write(JSON.stringify({"Message": "Welcome to the platform!"}));
    res.end();
}

export async function getUserInformation(userName, password, dbConnection)
{
    var user = await getUser(dbConnection, userName, password).catch(error => console.log("There is an error somewhere"));

    if (user.length == 0 ){
        return JSON.stringify({"message": "User doesn't exist"})
    }else{
        return JSON.stringify({"User": user[0]});
    }
}

export async function getResetCode(dbConnection, userID)
{

    var resetCodes = await retrieveResetCode(dbConnection, userID).catch((error) => {
        return JSON.stringify({"message": "There was an error retrieving the reset Codes"});
    });

    if(resetCodes.length == 0)
    {
        return JSON.stringify({"message": "There are no reset codes for this user"})
    }
    else{
        return JSON.stringify({"message": resetCodes})
    }
}

export async function createCodeForReset(dbConnection, gmailAddress)
{
    var userID = await getID(dbConnection, gmailAddress);

    if(userID.length == 0)
    {
        return JSON.stringify({"message": "The User doesn't exist"});
    }else{

    var value = await createResetCode(dbConnection, userID[0].id)
    
    if(value)
    {
        //console.log(result);
        return JSON.stringify({"message": "Reset Code Created"});
    }
    else{
        return JSON.stringify({"message": "There was an error creating the reset code"});
    }
}

}
