const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const { typeDefs, resolvers } = require('./schema')

// TODO: Add NODE_ENV variable
const { parsed : ENV_CONFIG } = require('dotenv').config()
const { HOST, PORT, DB_HOST, DB_USER, DB_PASS, DB_NAME } = ENV_CONFIG

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.

// TODO: getUser from token & add user info to the context
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true`,{
   useNewUrlParser: true,
   useCreateIndex: true
  })
  .then(()=> new ApolloServer({
    typeDefs, 
    resolvers 
  }).listen(PORT, HOST)
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  }))
  .catch(console.error)

// const server = new ApolloServer({ typeDefs, resolvers });

// // This `listen` method launches a web-server.  Existing apps
// // can utilize middleware options, which we'll discuss later.
// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });