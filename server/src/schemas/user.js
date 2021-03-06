const Joi = require('joi')

const SignUp = Joi.object().keys({
  firstname: Joi.string()
    .required()
    .label('Firstname'),
  lastname: Joi.string()
    .required()
    .label('Lastname'),
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .required()
    .label('Email'),
  password: Joi.string()
    .min(8)
    .max(30)
    .regex(/(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])/)
    .required()
    .label('Password')
    .options({
      language: {
        string: {
          regex: {
            base:
              'Must have at least one lowercase letter, one uppercase letter, one digit and one special character.',
          },
        },
      },
    }),
  language: Joi.string()
    .required()
    .label('Language'),
})

const SignIn = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .required()
    .label('Email'),
  password: Joi.string()
    .min(8)
    .max(30)
    .regex(/(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])/)
    .required()
    .label('Password')
    .options({
      language: {
        string: {
          regex: {
            base:
              'Must have at least one lowercase letter, one uppercase letter, one digit and one special character.',
          },
        },
      },
    }),
})

const UserGeneric = Joi.object().keys({
  firstname: Joi.string().label('Firstname'),
  lastname: Joi.string().label('Lastname'),
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .label('Email'),
  password: Joi.string()
    .min(8)
    .max(30)
    .regex(/(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])/)
    .label('Password')
    .options({
      language: {
        string: {
          regex: {
            base:
              'Must have at least one lowercase letter, one uppercase letter, one digit and one special character.',
          },
        },
      },
    }),
  language: Joi.string().label('Language'),
})

module.exports = { SignUp, SignIn, UserGeneric }
