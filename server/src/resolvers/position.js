const {
  UserInputError,
  AuthenticationError,
  ForbiddenError,
  ApolloError
} = require('apollo-server')

const Joi = require('joi')

const { Transaction } = require('../models')

const { GenericTransaction } = require('../schemas')

module.exports = {
  Query: {
    positions: (_, { portfolioId: portfolio_id }, { userId, isSignedIn }) => {
      console.log(portfolio_id, userId)
      // Transaction.find({ portfolio_id })
      return null
    },

    position: (
      _,
      { portfolioId: portfolio_id, stock },
      { userId, isSignedIn }
    ) => {
      console.log(portfolio_id, stock, userId)
    }
  }
}
