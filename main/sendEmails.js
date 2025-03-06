import {sendWelcomeEmail, initializeDatabase, sendResetCode} from "./email.js"

/*
var result = await sendWelcomeEmail("rafedrew7@gmail.com", "Rafe Drew").then((result) => {
    console.log(result);
}).
catch((error) => {
    console.log(error);
})
*/

var databaseCon = await initializeDatabase();

var result = await sendResetCode("rafeaaron21@gmail.com", databaseCon).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})

console.log(result);