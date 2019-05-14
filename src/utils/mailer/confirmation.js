const { transporter } = require("./transporter")

const { EMAIL_USER, HOST, CLIENT_PORT } = process.env
const SUBJECT = "Porfolio-Manager email confirmation"

const sendConfirmationEmail = async ({
  emailToken,
  firstname,
  lastname,
  email
}) => {
  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: SUBJECT,
    html: `
      <p>Hello ${firstname} ${lastname},</p> 
      <p>Please confirm your email by clicking on the following link: </p>
      <a href="http://${HOST}:${CLIENT_PORT}/confirmation/${emailToken}">
        http://${HOST}:${CLIENT_PORT}/confirmation/${emailToken}
      </a>
      <p>Thank you for your registration.</p>`,
    text: `Hello ${firstname} ${lastname}, 
      Please confirm your email by clicking on the following link: 
      http://${HOST}:${CLIENT_PORT}/confirmation/${emailToken}
      Thank you for your registration.`
  }

  const info = await transporter.sendMail(mailOptions)

  console.log("Email confirmation sent: %s", info.messageId)
}

module.exports = sendConfirmationEmail
