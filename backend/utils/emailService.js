import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

async function sendEmail(sendTo, subject, text, html) {
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_EMAIL,
            to: sendTo,
            subject,
            text,
            html,
        });

        return {
            success: true,
            messageId: info.messageId,
        };
    } catch (error) {
        console.error("Error sending email:", error);

        return {
            success: false,
            error: error.message,
        };
    }
}

export default sendEmail;