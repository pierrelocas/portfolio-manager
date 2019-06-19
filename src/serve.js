// TODO: Implement ssl

const { ApolloServer } = require('apollo-server')

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
  SECRET,
} = process.env

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
    }
  )
  .then(() =>
    new ApolloServer({
      typeDefs,
      resolvers,
      // TODO : Only userid and roles in token because in case of update user info will change
      context: async ({ req }) => {
        const {
          headers: { authentication },
        } = req
        try {
          if (!authentication) throw new Error('No authenticaton property')

          const token = authentication.split(' ')[1]
          if (!token) throw new Error('Bearer token malformed')

          const { userId } = await jwt.verify(token, SECRET)

          return { userId, isSignedIn: true }
        } catch (err) {
          console.warn('Context Warning :', err.name, err.message)
          return { userId: null, isSignedIn: false }
        }
      },
    })
      .listen(SERVER_PORT, HOST)
      .then(({ url }) => {
        console.log(`Server ready at ${url}`)
      })
  )
  .catch(console.log)
