const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

async function sendTokenMail (email: string, link: string) {
    const msg = {
        to: email, // Change to your recipient
        from: 'igorflribeiro@gmail.com', // Change to your verified sender
        subject: 'Reset password',
        text: 'and easy to do anywhere, even with Node.js',
        html: `
            <html>
                <head>
                    <style>
            
                    </style>
                </head>
                <body>
                    <p>Hi ${email},</p>
                    <p>You requested to reset your password.</p>
                    <p> Please, click the link below to reset your password</p>
                    <a href="https://${link}">Reset Password</a>
                </body>
            </html>
        `,
    }

    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error: Error) => {
            console.error(error)
        })
}

export const mailService = {
    sendTokenMail
}