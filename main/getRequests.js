import { getUser } from "./db.js";

export function welcomeUser(res)
{
    res.write("Welcome to the platform!");
    res.end();
}

export async function getUserInformation(userName, password, dbConnection)
{
    var user = await getUser(dbConnection, userName, password).catch(error => console.log("There is an error somewhere"));

    if (user.length == 0 ){
        return JSON.stringify({"message": "Data doesn't exist"})
    }else{
        return JSON.stringify({"User": user[0]});
    }
}