const { USER_GMAIL, USER_PASSWORD } = process.env;
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: USER_GMAIL,
        pass: USER_PASSWORD,
    },
});

async function sendMail(email, subject, body) {
    try {
        const mailOptions = {
            from: USER_GMAIL,
            to: email,
            subject: subject,
            html: body,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error.message);
            } else {
                console.log("Mail sent successfully");
            }
        });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { sendMail };
