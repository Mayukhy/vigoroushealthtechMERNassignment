import nodemailer, { createTransport } from 'nodemailer'

export const sendEmail = async (email, subject, text) => {
    try {
        const transporter = await nodemailer.createTransport({
            host: process.env.HOST,
            port: process.env.PORT,
            // secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.USER,
            to:email,
            subject,
            text
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

