import {createServer} from "http";
import { createConnection, addUser, closeConnection } from "./db.js";
import {welcomeUser, getUserInformation} from "./getRequests.js";
import {addUserToDatabase, updateUserPassword} from "./postRequests.js";

var databaseConnection = await createConnection();

var server = createServer( async (req, res) => {
    
    switch(req.url)
    {
        case "/": 
        {
            welcomeUser(res);
            break;
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
            resolve(JSON.parse(message));
        })
    })

}