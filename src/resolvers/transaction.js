const {
  UserInputError,
  AuthenticationError,
  ForbiddenError,
  ApolloError
} = require('apollo-server')

const Joi = require('joi')

const { Transaction, Portfolio } = require('../models')

const { CreateTransaction, GenericTransaction } = require('../schemas')

module.exports = {
  Query: {
    transactions: (_, { portfolioId: portfolio_id }, { userId, isSignedIn }) =>
      Transaction.find({ portfolio_id }),
    transaction: (_, { id: _id }) => Transaction.findOne({ _id })
  },
  Mutation: {
    createTransaction: async (_, { transaction }, { isSignedIn, userId }) => {
      // validate if user is signed in
      if (!isSignedIn)
        throw new AuthenticationError('Must be signed in to add a transaction')

      // validate input
      await Joi.validate({ transaction, CreateTransaction }).catch(err => {
        throw new UserInputError(`${err.name} : ${err.message}`)
      })

      const newTransaction = new Transaction({ ...transaction })
      const result = newTransaction.save()
      return result
    },

    updateTransaction: async (
      _,
      { id: _id, update },
      { userId, isSignedIn }
    ) => {
      // validate if user is signed in
      if (!isSignedIn)
        throw new AuthenticationError(
          'Must be signed in to update a transaction'
        )

      // validate input
      await Joi.validate({ update, GenericTransaction }).catch(err => {
        throw new UserInputError(`${err.name} : ${err.message}`)
      })

      // // validate if portfolio exist
      // const { portfolio_id } = await Transaction.findOne({ _id })
      // if (!portfolio_id) throw new ApolloError("Portfolio doesn't exist")
      // const { user_id } = await Portfolio.findOne({ _id: portfolio_id })
      // if (!user_id) throw new ApolloError("Portfolio doesn't exist")

      // // validate portfolio belongs to the signedIn user
      // if (user_id != userId)
      //   // user_id is object and userId is a string
      //   throw new ForbiddenError(
      //     'Can only add transaction to your own portfolio'
      //   )

      // Update Transacrion
      try {
        return !!(await Transaction.findOneAndUpdate({ _id }, update, {
          runValidators: true
        }))
      } catch (err) {
        throw new ApolloError(err, 'MONGO_UPDATE_ERROR')
      }

      // console.log(_id, update, userId, isSignedIn)
      // return Transaction.findOne()
    },

    deleteTransaction: async (_, { id: _id }, { userId, isSignedIn }) => {
      // validate if user is signed in
      if (!isSignedIn) {
        throw new AuthenticationError(
          'Must be signed in to delete a transaction'
        )
      }
      // Validate that transaction belongs to loggedIn user

      // Method 1.
      // const transaction = await Transaction.findById({ _id })
      // const user_id = await transaction.getOwnerId()

      // if (user_id !== userId) {
      //   throw new ForbiddenError(
      // 'Can only add transaction to your own portfolio'
      // )
      // }
      // TODO : Not sure it needs a try/catch
      // try {
      //   transaction.remove()
      // } catch (e) {
      //   throw new Error('shit happend')
      // }
      // return fatlse

      // Method 2.
      const transaction = await Transaction.findById({ _id }).populate({
        path: 'portfolio_id',
        select: 'user_id'
      })

      const {
        portfolio_id: { user_id }
      } = transaction

      if (userId !== String(user_id)) {
        throw new ForbiddenError(
          'Can only add transaction to your own portfolio'
        )
      }

      // TODO : Not sure it needs a try/catch
      try {
        // transaction.remove()
      } catch (e) {
        throw new Error('shit happend')
      }

      // Method 3. STATIC
      // pass transaction id and loggedIn user id to a static deleteteTransaction
      // get transaction
      // get portfolio
      // compare portfolio's user to current logged in user
      // delete transaction

      // Method 4. Method
      // get transaction within the resolver than called deleteTransaction on it,
      // passing the current logged in user
      // get portfolio
      // compare portfolio's user to current logged in user
      // delete transaction

      return true
    }
  }
}
