const nodemailer = require('nodemailer'); 
const xoauth2 = require('xoauth2');
require("dotenv").config()
import { MessageClient } from "cloudmailin"

export function sendEmail(to: string, subject: string, html: string) {

    const transporter = nodemailer.createTransport({
        port : 465,
        host: "smtp.gmail.com",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        secure: true
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        html: html
    }

    transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
            console.log(error)
        } else {
            console.log("Email sent: " + info.response)
        }
    })
}

export async function sendResetEmail(to: string, token: string) {

    console.log(process.env.EMAIL_USER)

    const transporter = nodemailer.createTransport({
        port : 465,
        host: "smtp.gmail.com",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        secure: true
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: "Password Reset",
        text: "test",
        html: `<p>Click <a href="http://localhost:4000/api/v1/user/setNewPassword">here</a> and use the following token ${token}</p>`,
    }

    transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
            console.log(error)
        } else {
            console.log("Email sent: " + info.response)
        }
    }
    )
}


