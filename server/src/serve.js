// TODO: Implement ssl

const { ApolloServer, ApolloError } = require('apollo-server')

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

require('dotenv').config()

const {
  HOST,
  SERVER_PORT,
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME,
  SECRET
} = process.env

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  )
  .then(() =>
    new ApolloServer({
      typeDefs,
      resolvers,
      // TODO : Only userid and roles in token because in case of update user info will change
      context: async ({ req }) => {
        console.log('Server request')
        const {
          headers: { authorization }
        } = req
        try {
          if (!authorization) throw new Error('No authorization property')

          const token = authorization.split(' ')[1]
          if (!token) throw new Error('Bearer token malformed')

          const { userId, confirmed } = await jwt.verify(token, SECRET)
          return {
            userId,
            isSignedIn: true,
            isConfirmed: confirmed,
            error: null
          }
        } catch (error) {
          // console.warn('Context Warning :', error.name, error.message)
          // throw new ApolloError(error)
          // return error
          return { isSignedIn: false, isConfirmed: false, error }
        }
      }
    })
      .listen(SERVER_PORT, HOST)
      .then(({ url }) => {
        console.log(`Server ready at ${url}`)
      })
  )
  .catch(console.log)
