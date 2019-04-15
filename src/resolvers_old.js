const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi = require('joi')

// SECRET in ENV variable?
const { SECRET } = require('./config') 
// const User = require('./models/user')
// const Portfolio = require('./models/portfolio')
// const Transaction = require('./models/transaction')
const { User, Portfolio, Transaction } = require('./models')
const { SignIn, signUp, AddPortfolio, AddTransaction} = require('./schemas')


// const { users, portfolios, transactions } = require('./db')

const resolvers = {
  Query: {
    users: () => User.find(),
    user: async (_, { id }, context) => console.log(context.user) || await User.findById(id),
    portfolios: (_, { user_id }) => portfolios.filter((p)=>p.user_id === user_id),
    portfolio:(_, { id }) => portfolios.find((p)=>p.id === id),
    transactions: (_, { portfolio_id }) => transactions.filter((t)=>t.portfolio_id === portfolio_id),
    transaction: (_, { id }) => transactions.find((t)=> t.id === id )
  },
  // Joi Schema has methods to include or exclude keys to validate (with, without, skip)
  Mutation: {
    signIn: async (_, { email, password }) => {
      await Joi.validate({ email, password }, SignIn )
      const user = await User.findOne({email})
      const match = await bcrypt.compare(password, user.password)
      if (!match) throw "Password didn't match"
      delete user.password
      const token = await jwt.sign({...user}, SECRET)
      return { token }
    },
    // TODO: should validate if email exist or handle errors appropriately
    register: async (_, { user }) => {
        await Joi.validate(user, Register, { abortEarly: false })
        const password = await bcrypt.hash(user.password, 12)
        const newUser = await new User({...user, password})
        const result = await newUser.save() //return the user
        delete newUser.password
        const token = await jwt.sign({...newUser}, SECRET)
        return { token }
    },
    removeUser: (_, { id })=>users[0],
    modifyUser: (_, { id, user })=> user[0],

    // CRUD for Portfolio
    addPortfolio: async (_, { portfolio },{ user }) => {
      if(!user) throw "User must be logged in!"
      const user_id = user._id
      await Joi.validate({...portfolio}, AddPortfolio)
      const newPortfolio = await new Portfolio({ user_id, ...portfolio })
      const result = await newPortfolio.save()
      return result
    },
    // removePortfolio: (_, { id }) => portfolios.filter((p) => p.id !== id),
    removePortfolio: async (_, { id }) => {
      const result = await Portfolio.findByIdAndDelete(id)
      if(result) return true
      else return false
    },
    // TODO: Do a try catch 
    modifyPortfolio: (_, { id, portfolio }) => {
      // const newPortfolios = portfolios.map((p)=> {
      //   if (p.id === portfolio.id){
      //     p = {...p, ...portfolio}
      //   }
      //   return p
      // })
      
      const result = Portfolio.findOneAndUpdate({_id : id}, portfolio)
      return result
    },

    // CRUD for Transaction
    addTransaction: async (_, { transaction }) => {
      const joiResult = await Joi.validate({ ...transaction, AddTransaction})
      console.log(joiResult)
      const newTransaction = new Transaction({ ...transaction })
      const result = newTransaction.save()
      return result
    },
    // removeTransaction: (parent, { id }, context, info) => transactions.filter((t)=> t.id !== id),
    removeTransaction: async (_, { id })=>{
      const result = await Transaction.findByIdAndDelete(id)
      if(result) return true
      else return false
    },
    modifyTransaction: (_, { id, transaction }) => {
      const result = Transaction.findOneAndUpdate({_id:id}, transaction)
      // const newTransaction = transactions.map((t)=>{
      //   if (t.id === id){
      //     t = {...t, ...transaction}
      //   }
      //   return t
      // })
      return result 
    }

  },
  // MutationResponse: (parent, { code, success, message }) => ({
  //   code,
  //   success,
  //   message
  // }),

  
  
};

module.exports = resolvers