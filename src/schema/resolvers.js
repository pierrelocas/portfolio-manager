const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = "22wh@lescanfly22feetsunderground"

const { users, portfolios, transactions } = require('./db')

const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) =>users.find((u)=>u.id === id),
    portfolios: (_, { user_id }) => portfolios.filter((p)=>p.user_id === user_id),
    portfolio:(_, { id }) => portfolios.find((p)=>p.id === id),
    transactions: (_, { portfolio_id }) => transactions.filter((t)=>t.portfolio_id === portfolio_id),
    transaction: (_, { id }) => transactions.find((t)=> t.id === id )
  },
  Mutation: {
    // TODO: should return a token
    signIn: async (_, { email, password }) => {
      const user = await users.find((u) => (u.email === email))
      const match = await bcrypt.compare(password, user.password)
      if (!match) throw "Password didn't match"
      delete user.password
      const token = await jwt.sign({...user}, SECRET)
      return { token }
    },
    // TODO: should return a token
    register: async (_, { user }) => {
      const id = Math.max(...users.map((u)=> u.id)) + 1
      const password = await bcrypt.hash(user.password, 12)
      const newUser = await { id, ...user, password }
      users.push(newUser)
      delete newUser.password
      const token = await jwt.sign({...newUser}, SECRET)
      return { token }
    },
    removeUser: (_, { id })=>users[0],
    modifyUser: (_, { id, user })=> user[0],

    // CRUD for Portfolio
    addPortfolio: (_, { user_id, name }) => {
      const id = Math.max(...portfolios.map((p)=> p.id)) + 1
      const portfolio = { id, user_id, name }
      portfolios.push(portfolio)
      return portfolio
    },
    removePortfolio: (_, { id }) => portfolios.filter((p) => p.id !== id),
    modifyPortfolio: (_, { portfolio }) => {
      const newPortfolios = portfolios.map((p)=> {
        if (p.id === portfolio.id){
          p = {...p, ...portfolio}
        }
        return p
      })
      return newPortfolios
    },

    // CRUD for Transaction
    addTransaction: (_, { transaction }) => {
      const id = Math.max(...transactions.map((t)=> t.id))+1
      const newTransaction = {id, ...transaction}
      transactions.push(newTransaction)
      return transactions
    },
    removeTransaction: (parent, { id }, context, info) => transactions.filter((t)=> t.id !== id),
    modifyTransaction: (_, { id, transaction }) => {
      const newTransaction = transactions.map((t)=>{
        if (t.id === id){
          t = {...t, ...transaction}
        }
        return t
      })
      return newTransaction
    }

  },
  // MutationResponse: (parent, { code, success, message }) => ({
  //   code,
  //   success,
  //   message
  // }),

  
  
};

module.exports = resolvers