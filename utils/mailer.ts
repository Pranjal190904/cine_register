import {createTransport} from "nodemailer";
import { EMAIL, PASS } from '../config/env.config';

const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: EMAIL,
      pass: PASS,
    }
})

export const sendMail = async (to: string,link:string): Promise<void> => {
    try {
        await transporter.sendMail({
            from: EMAIL,
            to,
            subject: "Verification Email",
            html: `Please click on the link to verify your email. <br> <a href=${link}>Click here</a>`
        });
    } catch (error) {
        console.log(error);
    }
}

export const sendPassword = async (to: string,studentNumber:string,password:string): Promise<void> => {
    try {
        await transporter.sendMail({
            from: EMAIL,
            to,
            subject: "Login Credentials for CINE",
            html: `Thank you for registering in CINE. <br> Your login credentials are <br> Student Number: ${studentNumber} <br> password : ${password}. <br> Please keep it safe. <br> `
        });
    } catch (error) {
        console.log(error);
    }
}