const Joi = require('joi')

const  { Transaction }  = require('../models')

const { CreateTransaction } = require('../schemas')

module.exports = {
  Query: {
    transactions: (_, { portfolio_id }) => transactions.filter((t)=>t.portfolio_id === portfolio_id),
    transaction: (_, { id }) => transactions.find((t)=> t.id === id )

  },
  Mutation: {
    createTransaction: async (_, { transaction }) => {
      await Joi.validate({ ...transaction, CreateTransaction})
      const newTransaction = new Transaction({ ...transaction })
      const result = newTransaction.save()
      return result
    },
  }
}