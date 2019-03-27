const Joi = require('joi');

const Register =  Joi.object().keys({
  firstname: Joi.string().required().label('Firstname'),
  lastname: Joi.string().required().label('Lastname'),
  email: Joi.string().email({ minDomainAtoms: 2 }).required().label('Email'),
  password: Joi.string().regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/).label('Password').options({
    language: {
      string : {
        regex : {
          base: 'Must have at least one lowercase letter, one uppercase letter, one digit and one special character.'
        }
      }
    }
  })
})

// Does SignIn require a pattern for SignIn since already compared to stored data
const SignIn = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }).required().label('Email'),
  password: Joi.string().regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/).label('Password').options({
    language: {
      string : {
        regex : {
          base: 'Must have at least one lowercase letter, one uppercase letter, one digit and one special character.'
        }
      }
    }
  })
})


module.exports = {Register, SignIn}
