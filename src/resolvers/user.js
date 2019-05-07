const { UserInputError, AuthenticationError, ForbiddenError, ApolloError } = require('apollo-server')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const nodemailer = require('nodemailer')

require('dotenv').config()
const { SECRET, EMAIL_SECRET, EMAIL_USER, EMAIL_PASS } = process.env

const { User } = require('../models')

const { SignIn, SignUp, UpdateUser } = require('../schemas')

const sendConfirmationEmail = async (token, firstname) => {
  const tranporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  })

  const mailOptions = {
    from: 'pierre.locas@gmail.com',
    to: 'pierre.locas@gmail.com',
    subject: 'Porfolio-Manager email confirmation',
    html: `<p>Hello ${firstname},</p> 
    <p>Please confirm your email by clicking on the following link: </p>
    <a href="http://localhost:3000/confirmation/${token}">
      http://localhost:3000/confirmation/${token}
    </a>
    <p>Thank you for your registration</p>`,
    text: `Hello ${firstname}, 
    Please confirm your email by clicking on the following link: 
    http://localhost:3000/confirmation/${token}
    thank you for your registration`
  }

  try {
    const result = await tranporter.sendMail(mailOptions)
    console.log(result)
    return true
  }catch(e){
    console.log(e)
    return false
  }
}

module.exports = {
  Query: {
    users: async (parent, args, context, info) => {
      // console.log('in users resolver')
      const users = await User.find()
      // console.log(users)
      return users
    }, // TODO: ADMIN ROLE only

    // TODO: Only user info for the logged in user
    // Handle error message
    me: async (parent, args, { userId }) => userId? await User.findById(userId): null 
  },
  Mutation: {
    signIn: async (_, { email, password }, context, info) => {
      // Validate input
      try{
        await Joi.validate({ email, password }, SignIn, { abortEarly: false } )
      }catch (err){
        throw new UserInputError(err.name, err)
      }

      // Retreive user from DB
      const user = await User.findOne({email})
      if (!user) throw new AuthenticationError(`User <${email}> doesn't exist`)

      // TODO: Check if email is confirmed

      // Check if password match
      const matched = await bcrypt.compare(password, user.password)
      if (!matched) throw new AuthenticationError("Password didn't match")

      // Create and return token with user info
      const token = await jwt.sign({ userId : user._id }, SECRET)
      
      return { token }
    },

    signUp: async (_, { user }) => {
      try{
        await Joi.validate(user, SignUp, { abortEarly: false })
      }catch (err){
        throw new UserInputError(err.name, err)
      }

      const password = await bcrypt.hash(user.password, 12)
      
      const newUser = await (
        await new User({...user, password})
      ).save()
      
      const token = await jwt.sign({userId : newUser._id}, SECRET)
 
      // TODO: send confirmaton email async
      const emailToken = await jwt.sign({userId : newUser._id}, EMAIL_SECRET)
      const emailResult = await sendConfirmationEmail(emailToken, newUser.firstname)

      return { token }
    },

    deleteUser: (_, { id })=>users[0], //TODO : after portfolio and transaction for cascade delete
    
    updateUser: async (_, { id, update }, { isSignedIn, userId}, info)=> {
      // validate if user is signed in
      if (!isSignedIn) throw new AuthenticationError('Must be signed in to update a user')
      
      // validate if id provided belongs to the signedIn user
      if (id !== userId) throw new ForbiddenError('Can only update your own account')
      
      // validate if fields to update (Joy)
      try {
        await Joi.validate(update, UpdateUser)
      }catch (err){
        throw new UserInputError(err.name, err)
      }

      // update DB and return successful flag
      try{
        return !!await User.findOneAndUpdate({_id :id}, update)
      }catch(err){
        throw new ApolloError(err, 'MONGO_UPDATE_ERROR')
      }
    },

    confirmEmail: async (_, { token }, context, info ) =>{
      const { userId } = await jwt.verify(token, EMAIL_SECRET)

      try{
        return  !!await User.findOneAndUpdate({_id :userId}, {confirmed : true})
      }catch(err){
        throw new ApolloError(err, 'MONGO_UPDATE_ERROR')
      }
           
    }
  }
}