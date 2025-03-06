import {createServer} from "http";
import { createConnection, addUser, closeConnection, getID } from "./db.js";
import {welcomeUser, getUserInformation, createCodeForReset, getResetCode} from "./getRequests.js";
import {addUserToDatabase, updateUserPassword} from "./postRequests.js";
import { sendResetCode } from "./email.js";

var databaseConnection = await createConnection();

var server = createServer( async (req, res) => {
    
    switch(req.url)
    {
        case "/": 
        {
            welcomeUser(res);
            break;
        }

        case "/getResetCode":
        {
            var info = await getData(req);
            console.log(info);

            if(!("emailAddress" in info))
            {
                res.write(JSON.stringify({"message": "Please provide an email address with the API."}))
                res.end();
                return;
            }

            var userID = await getID(databaseConnection, info.emailAddress)

            if(userID.length == 0)
            {
                res.write(JSON.stringify({"message": "No User registered with this email"}))
                res.end();
            }else{

                var message = await getResetCode(databaseConnection, userID[0].id)

                res.write(message);
                res.end();
            }
        }

        case "/getUser":
        {
            var info = await getData(req);

            console.log(info);

            var message = await getUserInformation(info.userName, info.password, databaseConnection);

            res.write(message);
            res.end();
        }

        case "/updatePassword":
        {
            var info = await getData(req);
            console.log(info);

            var message = await updateUserPassword(databaseConnection, info.newPassword, info.Id);

            res.write(message);
            res.end();
        }

        case "/createResetCode":
        {
            var info = await getData(req);
            console.log(info);

            if(!("emailAddress" in info))
            {
                console.log("Error")
                res.write(JSON.stringify({"message": "Please provide an email address"}));
                res.end();
            }else{
                var message = await createCodeForReset(databaseConnection, info.emailAddress);
                console.log(message)
                res.write(message);
                res.end();
            }

        }

        case "/addUser":
        {
            var info = await getData(req);
            console.log(info);
            
            var message = await addUserToDatabase(databaseConnection, info.userName, info.firstName, info.lastName, info.email, info.password);
            res.write(message);
            res.end();
        }
    }

}).listen(8090);

async function getData(req){
    return new Promise((resolve, reject) => {
        let message = "";

        req.on('data', (chunk) => {
            message += chunk.toString();
        })

        req.on('end', ()=>{
            console.log("Data stream ended")

            if(message != ""){
                resolve(JSON.parse(message));
            }
            else{
                resolve({})
            }
        })
    })

}