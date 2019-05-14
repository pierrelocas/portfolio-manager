const { transporter } = require('./transporter')

const { EMAIL_USER, HOST, CLIENT_PORT } = process.env
const SUBJECT = 'Porfolio-Manager reset password request'

const sendResetPasswordEmail = async ({
  token,
  firstname,
  lastname,
  email,
}) => {
  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: SUBJECT,
    html: `
      <p>Hello ${firstname} ${lastname},</p> 
      <p>Please follow the link below in order to reset your password. </p>
      <a href="http://${HOST}:${CLIENT_PORT}/confirmation/${token}">
        http://${HOST}:${CLIENT_PORT}/reset-password/${token}
      </a>
      <p>Salutations</p>`,
    text: `Hello ${firstname} ${lastname}, 
      Please follow the link below in order to reset your password. 
      http://${HOST}:${CLIENT_PORT}/reset-password/${token}
      Salutations.`,
  }

  const info = await transporter.sendMail(mailOptions)

  console.log('Reset password email sent: %s', info.messageId)
}

module.exports = sendResetPasswordEmail
