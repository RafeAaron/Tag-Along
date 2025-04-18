import {createServer} from "http";
import { createConnection, addUser, closeConnection, getID, getIDFromUsername } from "./db.js";
import {welcomeUser, getUserInformation, createCodeForReset, getResetCode} from "./getRequests.js";
import {addUserToDatabase, updateUserPassword, initialisePayment, addDriverRecord, addBooking_UnVerified} from "./postRequests.js";
import { sendResetCode, sendWelcomeEmail } from "./email.js";

/*
    Finished apis
        sendWelcomeEmail
        getUser
        initializePayment
        /
        getResetCode
        getUser
        updatePassword
        createResetCode
        addUser
        sendResetCodeEmail
*/

var databaseConnection = await createConnection();

var server = createServer( async (req, res) => {
    
    switch(req.url)
    {

        case "/advertiseBooking":
        {
            var info = await getData(req);
            console.log(info);

            //user_id, start_location, end_location, date, initial_amount, time

            let neccessary_fields = ["user_id", "start_location", "end_location", "date", "initial_amount", "time"];
            let missing_fields = [];
            
            for(let i = 0; i < neccessary_fields.length; i++)
            {

                if(!(neccessary_fields[i] in info))
                {
                    missing_fields.push(neccessary_fields[i]);
                }
            }

            if(missing_fields.length != 0)
            {
                let message = "Please include: ";
                for(let a = 0; a < missing_fields.length; a++)
                {
                    if(a == missing_fields.length - 1)
                    {
                        message +=missing_fields[a];
                    }else{
                        message += missing_fields[a] + ", ";
                    }
                }

                res.write(message);
                res.end();
            }else{
                
                let message = await addBooking_UnVerified(databaseConnection, info.user_id, info.start_location, info.end_location, info.date, info.initial_amount, info.time)

                res.write(message);
                res.end();
            }

            break;
        }

        case "make_driver":
        {
            var info = await getData(req);
            console.log(info);

            if(!("user_id" in info))
            {
                res.write(JSON.stringify({"Message": "Please include user_id"}));
                res.end;
                break;
            }

            if(!("car_model" in info))
            {
                res.write(JSON.stringify({"Message": "Please include car_model"}));
                res.end;
                break;
            }

            if(!("number_plate" in info))
            {
                res.write(JSON.stringify({"Message": "Please include number_plate"}));
                res.end;
                break;
            }

            if(!("color" in info))
            {
                res.write(JSON.stringify({"Message": "Please include color"}));
                res.end;
                break;
            }
    
            if(!("type" in info))
            {
                res.write(JSON.stringify({"Message": "Please include type"}));
                res.end;
                break;
            }

            let message = await addDriverRecord(databaseConnection, info.user_id, info.car_model, info.number_plate, info.color, info.type);

            res.write(message);
            res.end();
        }

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
                res.write(JSON.stringify({"message": "Please provide an emailAddress to the API."}))
                res.end();
                return;
            }

            var userID = await getID(databaseConnection, info.emailAddress)

            if(userID.length == 0)
            {
                res.write(JSON.stringify({"message": "No User registered with this email"}))
                res.end();
            }else{

                var message = await getResetCode(databaseConnection, userID[0].id);

                console.log(message);

                res.write(message);
                res.end();
            }
        }

        case "/getUser":
        {
            var info = await getData(req);

            console.log(info);

            if(!("user_name" in info))
            {
                res.write(JSON.stringify({"Message": "Please provide a user_name"}));
                res.end();
            }

            if(!("password" in info))
            {
                res.write(JSON.stringify({"Message": "Please provide a password"}));
                res.end();
            }

            var message = await getUserInformation(info.user_name, info.password, databaseConnection);

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

            if(!("role" in info))
            {
                res.write(JSON.stringify({"Message": "Please provide a value for role"}));
                res.end();
                break;
            }

            var message = await addUserToDatabase(databaseConnection, info.user_name, info.first_name, info.last_name, info.email, info.password, info.role);
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
