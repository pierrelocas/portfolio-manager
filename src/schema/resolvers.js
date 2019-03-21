const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// SECRET in env variable
const { SECRET } = require('../config') 
const User = require('../models/user')
const Portfolio = require('../models/portfolio')
const Transaction = require('../models/transaction')

const { users, portfolios, transactions } = require('./db')

const resolvers = {
  Query: {
    users: () => User.find(),
    user: async (_, { id }, context) => console.log(context.user) || await User.findById(id),
    portfolios: (_, { user_id }) => portfolios.filter((p)=>p.user_id === user_id),
    portfolio:(_, { id }) => portfolios.find((p)=>p.id === id),
    transactions: (_, { portfolio_id }) => transactions.filter((t)=>t.portfolio_id === portfolio_id),
    transaction: (_, { id }) => transactions.find((t)=> t.id === id )
  },
  Mutation: {
    // TODO: should return a token
    signIn: async (_, { email, password }) => {
      const user = await User.findOne({email})
      const match = await bcrypt.compare(password, user.password)
      if (!match) throw "Password didn't match"
      delete user.password
      const token = await jwt.sign({...user}, SECRET)
      return { token }
    },
    // TODO: should return a token
    // TODO: should validate if email exist or handle errors appropriately
    register: async (_, { user }) => {
      // const id = Math.max(...users.map((u)=> u.id)) + 1
      try{
        const password = await bcrypt.hash(user.password, 12)
        const newUser = await new User({...user, password})
        const result = await newUser.save() //return the user
        delete newUser.password
        const token = await jwt.sign({...newUser}, SECRET)
        return { token }
      }catch(e){
        console.log(e.code)
      }
    },
    removeUser: (_, { id })=>users[0],
    modifyUser: (_, { id, user })=> user[0],

    // CRUD for Portfolio
    addPortfolio: async (_, { portfolio }) => {
      const newPortfolio = await new Portfolio({ ...portfolio })
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
    addTransaction: (_, { transaction }) => {
      // const id = Math.max(...transactions.map((t)=> t.id))+1
      // console.log(new Date(transaction.date))
      // const newTransaction = new Transaction({ ...transaction, date: new Date(transaction.date) })
      const newTransaction = new Transaction({ ...transaction })
      // transactions.push(newTransaction)
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