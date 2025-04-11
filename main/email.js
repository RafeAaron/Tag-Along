import nodemailer from "nodemailer"
import {createConnection, createResetCode, getID, getUser} from "./db.js"

export async function initializeDatabase()
{
    try{
        return await createConnection();
    }catch(error)
    {
        console.log("Error: ", error)
    }

}

export async function sendWelcomeEmail(gmailAddress, username)
{

    const transporter = nodemailer.createTransport(
        {
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "tagalong2002@gmail.com",
                pass: "mwel hpjr kals vxyn "
            }
        }
    );

    return new Promise((resolve, reject) => {

        var mailingOptions = {
            from: "tagalong2002@gmail.com",
            to: gmailAddress,
            subject: "Welcome, " + username + "!",
            text:"Hey there " + username + "! We are Tag Along," +
            "A community that believes in leveraging the power of community effort to utilise transport resources." + 
            "Share a car, make the world a better place one ride at a time."
        };

        transporter.sendMail(mailingOptions, (error, info) => {
            if(error) reject(error);

            resolve(info.response);
        })

    });

}

export async function sendResetCode(gmailAddress, resetCode)
{
    
    const transporter = nodemailer.createTransport(
        {
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "tagalong2002@gmail.com",
                pass: "mwel hpjr kals vxyn "
            }
        }
    );

    return new Promise((resolve, reject) => {

        var mailingOptions = {
            from: "tagalong2002@gmail.com",
            to: gmailAddress,
            subject: "Reset Code",
            text:"Sorry that you forgot your password. The code sent with this email should be able to help you reset it\n" +
            `${resetCode}` + 
            "\nShare a car, make the world a better place one ride at a time."
        };

        transporter.sendMail(mailingOptions, (error, info) => {
            if(error) reject(error);

            resolve(info.response)
        })

    });

}


export async function sendPaymentConfirmationEmail(user, paymentID, amount)
{

    return new Promise((resolve, reject) => {

    const transporter = nodemailer.createTransport(
        {
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "tagalong2002@gmail.com",
                pass: "mwel hpjr kals vxyn "
            }
        }
    );

    var mailingOptions = {
        from: "tagalong2002@gmail.com",
        to: gmailAddress,
        subject: "Payment Confirmation",
        text:`Hello ${user}.\nYour payment of amount ${amount} with ID: ${paymentID} has been successful.` +
        "\nThank you for using Tag Along, We hope you'll keep partnering with us to make the world a better place.\n"+
        `Your's sincerely,\nTag Along Team`
    };

        transporter.sendMail(mailingOptions, (err, info) => {

            if(err) reject(err);

            resolve(info);
    
        });
    })
}