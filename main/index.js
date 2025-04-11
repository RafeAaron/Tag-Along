import {createServer} from "http";
import { createConnection, addUser, closeConnection, getID, getIDFromUsername } from "./db.js";
import {welcomeUser, getUserInformation, createCodeForReset, getResetCode} from "./getRequests.js";
import {addUserToDatabase, updateUserPassword, initialisePayment} from "./postRequests.js";
import { sendResetCode, sendWelcomeEmail } from "./email.js";

var databaseConnection = await createConnection();

var server = createServer( async (req, res) => {
    
    switch(req.url)
    {

        case "sendWelcomeEmail":
        {

            var info = await getData(req);
            console.log(info);

            if(!("user_email_address" in info))
            {

                res.write(JSON.stringify({"Message": "Please include user_email_address"}));
                res.end();
                break;

            }

            if(!("user_name" in info)){
                res.write(JSON.stringify({"Message": "Please provide a user_name"}));
                res.end();
                break;
            }

            sendWelcomeEmail(info.user_email_address, user_name)
            break;
        }

        case "/": 
        {
            welcomeUser(res);
            break;
        }

        case "/initialisePayment":
        {
            var info = await getData(req);
            console.log(info);

            if(!("sender_user_name" in info))
            {
                res.write(JSON.stringify({"message": "Please provide a value for the senderUserName"}))
                res.end();
                return;
            }

            if(!("reciever_user_name" in info))
            {
                res.write(JSON.stringify({"message": "Please provide a value for the recieverUserName"}))
                res.end();
                return;
            }

            var senderID = await getIDFromUsername(databaseConnection, info.sender_user_name);
            var recieverID = await getIDFromUsername(databaseConnection, info.reciever_user_name);

            console.log(senderID);
            console.log(recieverID);

            if(senderID.length == 0)
            {
                res.write(JSON.stringify({"message": "Sender Not Registered in this system"}));
                res.end();
                break;
            }

            if(recieverID.length == 0)
            {
                res.write(JSON.stringify({"message": "Reciever Not Registered in the system"}));
                res.end();
                break;
            }

            if(!("amount" in info))
            {
                res.write(JSON.stringify({"message": "Please specify an amount"}));
                res.end();
                break;
            }

            console.log(info.amount);

            if(!("reason" in info))
            {
                res.write(JSON.stringify({"message": "Reason not present"}));
                res.end();
                break;
            }

            console.log(info.reason);

            var success = await initialisePayment(senderID[0].id, recieverID[0].id, databaseConnection, info.amount, info.reason);

            res.write(success);
            res.end();
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

            //console.log("Checking");

            if(!("user_name" in info))
            {
                res.write(JSON.stringify({"Message": "Please provide a value for user_name"}));
                console.log("Checking");
                res.end();
                break;
            }

            if(!("first_name" in info))
            {
                res.write(JSON.stringify({"Message": "Please provide a value for first_name"}));
                res.end();
                break;
            }

            if(!("last_name" in info))
            {
                res.write(JSON.stringify({"Message": "Please provide a value for last_name"}));
                res.end();
                break;
            }
    
            if(!("email" in info))
            {
                res.write(JSON.stringify({"Message": "Please provide a value for email_name"}));
                res.end();
                break;
            }
            
            if(!("password" in info))
            {
                res.write(JSON.stringify({"Message": "Please provide a value for password"}));
                res.end();
                break;
            }

            var message = await addUserToDatabase(databaseConnection, info.user_name, info.first_name, info.last_name, info.email, info.password);

            console.log(message);
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