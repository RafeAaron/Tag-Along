import {createTransport} from "nodemailer";

const transporter = createTransport({
    service : 'gmail',
    auth: {
        user : 'rafedrew7@gmail.com',
        pass: "Stuart@2024"
    }
})

var mailOptions = {
    from : "rafedrew7@gmail.com",
    to: "rafeaaron21@gmail.com",
    subject: "Trial application",
    text: "This was easy"
}

transporter.sendMail(mailOptions, (error, info) => {

    if(error)
    {
        console.log(error);
    }else{
        console.log("Email sent: " + info.response);
    }
})