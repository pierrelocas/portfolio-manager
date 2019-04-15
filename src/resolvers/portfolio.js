const Joi = require('joi')

const  { Portfolio }  = require('../models')

const { CreatePortfolio } = require('../schemas')

module.exports = {
  Query: {
    portfolios: (_, { user_id }) => portfolios.filter((p)=>p.user_id === user_id),
    portfolio:(_, { id }) => portfolios.find((p)=>p.id === id),
  },
  Mutation: {
    createPortfolio: async (_, { portfolio },{ user }) => {
      if(!user) throw "User must be logged in!"
      const user_id = user._id
      await Joi.validate({...portfolio}, CreatePortfolio)
      const newPortfolio = await new Portfolio({ user_id, ...portfolio })
      const result = await newPortfolio.save()
      return result
    },
  }
}