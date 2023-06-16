const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

require('dotenv').config()

const sendMail = (email, subject, message) => {
    // const __dirname = path.resolve()
    const transporter = nodemailer.createTransport({
        // host: 'smtp.yahoo.com', port : 465, secure: true,
        service: "gmail",
        auth: { user: process.env.EMAIL , pass: process.env.PASSKEY }
    })
    // transporter.use('compile',
    //     hbs({viewEngine:'nodemailer-express-handlebars', viewPath:path.join(__dirname,'/controller/views/')}))


    const mailOptions = {
        from: process.env.USER,
         to: email,
        subject: subject,
        text: message,
        // context : {
        // name:name
        // }

    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err.message)
            res.status(500)
            res.send({ message: err.message, success: false })
        } else {
            res.status(200)
            console.log('Email not sent')
            res.send({ message: 'sent', success: true })
        }
    })
}
module.exports = sendMail