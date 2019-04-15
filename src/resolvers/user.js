const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi = require('joi')

require('dotenv').config()
const { SECRET } = process.env

const { User } = require('../models')

const { SignIn, SignUp } = require('../schemas')

module.exports = {
  Query: {
    users: () => User.find(), // TODO: ADMIN ROLE only

    // TODO: Only user info for the logged in user
    me: async (parent, args, { user }) => user? User.findById(user._id): null 
  },
  Mutation: {
    signIn: async (_, { email, password }) => {
      await Joi.validate({ email, password }, SignIn, { abortEarly: false } )
      const user = await User.findOne({email})
      const match = await bcrypt.compare(password, user.password)
      if (!match) throw new Error("Password didn't match")
      delete user.password
      const token = await jwt.sign({...user}, SECRET)
      return { token }
    },
    signUp: async (_, { user }) => {
      await Joi.validate(user, SignUp, { abortEarly: false })
      const password = await bcrypt.hash(user.password, 12)
      const newUser = await (
        await new User({...user, password})
      ).save()
      delete newUser.password
      const token = await jwt.sign({...newUser}, SECRET)
      return { token }
    },
    deleteUser: (_, { id })=>users[0],
    updateUser: (_, { id, user })=> user[0]
  }

}