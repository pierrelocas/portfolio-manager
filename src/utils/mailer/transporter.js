const nodemailer = require('nodemailer')

const { EMAIL_USER, EMAIL_PASS, EMAIL_SERVICE } = process.env

const transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
})

module.exports = { transporter }
