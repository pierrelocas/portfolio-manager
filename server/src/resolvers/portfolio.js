const {
  UserInputError,
  AuthenticationError,
  ForbiddenError,
  ApolloError
} = require('apollo-server')

const Joi = require('joi')

const { Portfolio } = require('../models')

const { CreatePortfolio, GenericPortfolio } = require('../schemas')

module.exports = {
  Query: {
    portfolios: (_, args, { userId: user_id }) => Portfolio.find({ user_id }),
    portfolio: (_, { id: _id }, { userId: user_id }) =>
      Portfolio.findOne({ _id, user_id })
  },
  Mutation: {
    // TODO: portfolio name unique for a user. OK VALIDATION DONE IN SCHEMA
    createPortfolio: async (_, { portfolio }, { userId }) => {
      if (!userId) throw new AuthenticationError('User must be logged in!')

      await Joi.validate(portfolio, CreatePortfolio).catch(err => {
        throw new UserInputError(`${err.name} : ${err.message}`)
      })

      const newPortfolio = await new Portfolio({
        user_id: userId,
        ...portfolio
      })

      return await newPortfolio.save()
    },

    updatePortfolio: async (_, { id: _id, update }, { isSignedIn, userId }) => {
      // validate if user is signed in
      if (!isSignedIn)
        throw new AuthenticationError('Must be signed in to update a user')

      // validate input
      await Joi.validate(update, GenericPortfolio).catch(err => {
        throw new UserInputError(`${err.name} : ${err.message}`)
      })

      // validate if portfolio exist and belongs to the signedIn user
      const { user_id } = await Portfolio.findOne({ _id })
      if (user_id != userId)
        // user_id is object and userId is a string
        throw new ForbiddenError('Can only update your own account')

      // Update Portfolio
      try {
        return await Portfolio.findOneAndUpdate({ _id }, update, { new: true })
      } catch (err) {
        throw new ApolloError(err, 'MONGO_UPDATE_ERROR')
      }
    },

    deletePortfolio: async (_, { id }, { userId, isSignedIn }) => {
      // validate if user is signed in
      // if (!isSignedIn)
      //   throw new AuthenticationError('Must be signed in to update a user')
      // const doc = await Portfolio.findById(_id)
      // await doc.remove()
      const result = await Portfolio.deletePortfolio(id)
      console.log(result)
      return true
    },

    deletePortfolios: async (_, args, { userId, isSignedIn }) => {
      const result = await Portfolio.deletePortfolios(userId)
      return result
    }
  }
}
