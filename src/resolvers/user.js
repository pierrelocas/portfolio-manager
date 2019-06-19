const {
  UserInputError,
  AuthenticationError,
  ForbiddenError,
  ApolloError
} = require('apollo-server')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi = require('joi')

require('dotenv').config()

const { SECRET, EMAIL_SECRET, RESET_SECRET } = process.env

const { User } = require('../models')
const { SignIn, SignUp, UserGeneric } = require('../schemas')
const sendConfirmationEmail = require('../utils/mailer/confirmation')
const sendResetPasswordEmail = require('../utils/mailer/resetPassword')

module.exports = {
  Query: {
    // TODO: Only an admin can queries all user
    users: async (parent, args, { isSignedIn }, info) => {
      if (!isSignedIn) throw new ForbiddenError('Must be a signed in admin.')
      return await User.find().catch(err => {
        throw new ApolloError(err, 'MONGO_FIND_ERROR')
      })
    },
    // TODO: ADMIN ROLE only
    // Handle error message
    me: async (parent, args, { userId }) =>
      await User.findById(userId).catch(err => {
        throw new AuthenticationError(
          'Failed to retrieve user, must be signed in'
        )
      })
  },
  Mutation: {
    signIn: async (_, { email, password }, context, info) => {
      // Validate input
      await Joi.validate({ email, password }, SignIn, {
        abortEarly: false
      }).catch(err => {
        throw new UserInputError(`${err.name} : ${err.message}`)
      })

      // Retreive user from DB
      const user = await User.findOne({ email })
      if (!user) throw new AuthenticationError(`User <${email}> doesn't exist`)

      // TODO: Check if email is confirmed

      // Check if password match
      const matched = await bcrypt.compare(password, user.password)
      if (!matched) throw new AuthenticationError("Password didn't match")

      // Create and return token with user info
      const token = jwt.sign({ userId: user._id }, SECRET)

      return { token }
    },

    signUp: async (_, { user }) => {
      await Joi.validate(user, SignUp, { abortEarly: false }).catch(err => {
        throw new UserInputError(`${err.name} : ${err.message}`)
      })

      const password = await bcrypt.hash(user.password, 12).catch(console.err)

      const { _id, firstname, lastname, email } = await await new User({
        ...user,
        password
      }).save()

      const token = await jwt.sign({ userId: _id }, SECRET, {
        expiresIn: 3
      })

      // TODO: send confirmaton email async
      const emailToken = await jwt.sign({ userId: _id }, EMAIL_SECRET, {
        expiresIn: '1d'
      })

      // TODO: Handle errors when sending email
      sendConfirmationEmail({ emailToken, firstname, lastname, email }).catch(
        console.error
      )

      return { token }
    },

    deleteUser: async (_, { id }, { isSignedIn, userId }) => {
      await User.deleteUser(id)
      return true
    },

    updateUser: async (_, { id, update }, { isSignedIn, userId }, info) => {
      // validate if user is signed in
      if (!isSignedIn)
        throw new AuthenticationError('Must be signed in to update a user')

      // validate if id provided belongs to the signedIn user
      if (id !== userId)
        throw new ForbiddenError('Can only update your own account')

      // validate if fields to update (Joy)
      try {
        await Joi.validate(update, UserGeneric)
      } catch (err) {
        throw new UserInputError(err.name, err)
      }

      // update DB and return successful flag
      try {
        return !!(await User.findOneAndUpdate({ _id: id }, update))
      } catch (err) {
        throw new ApolloError(err, 'MONGO_UPDATE_ERROR')
      }
    },

    confirmEmail: async (_, { token }, context, info) => {
      const { userId } = await jwt.verify(token, EMAIL_SECRET)

      try {
        return !!(await User.findOneAndUpdate(
          { _id: userId },
          { confirmed: true }
        ))
      } catch (err) {
        throw new ApolloError(err, 'MONGO_UPDATE_ERROR')
      }
    },

    // TODO : Error handling, implement a secret question
    resetPasswordRequest: async (_, { email }) => {
      //validate email
      try {
        await Joi.validate({ email }, UserGeneric)
      } catch (err) {
        throw new UserInputError(err.name, err)
      }

      //Get user id, throw error if doesn't exist... maybe try/catch
      const user = await User.findOne({ email })
      if (!user) throw new AuthenticationError(`User <${email}> doesn't exist`)

      // TODO: email confirm ? when resetting password automatically confirm email in "resetPassword"

      // create token with user id
      const { _id, firstname, lastname } = user
      const token = await jwt.sign({ userId: _id }, RESET_SECRET, {
        expiresIn: '1d'
      })

      // send email
      sendResetPasswordEmail({ token, firstname, lastname, email }).catch(
        console.error
      )
      console.log('resetting password for', email)
      return true
    },

    // TODO : Error handling
    resetPassword: async (_, { token, password }) => {
      console.log('updating password!! :', token, password)

      // validate password
      try {
        await Joi.validate({ password }, UserGeneric)
      } catch (err) {
        throw new UserInputError(err.name, err)
      }

      // extract id from token (try/catch)
      const { userId } = await jwt.verify(token, RESET_SECRET)

      // encrypt password
      const hashPassword = await bcrypt.hash(password, 12).catch(console.err)

      // update password in db
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { password: hashPassword }
      )
      console.log(user)
      // sign in the user?
      return true
    }
  }
}
