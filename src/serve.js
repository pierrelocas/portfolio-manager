const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const { typeDefs, resolvers } = require('./schema')

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.

// TODO: Add user info to the context
mongoose.connect("mongodb+srv://admin:test@portfolio-cluster-i1nqe.mongodb.net/portfolio-db?retryWrites=true", { useNewUrlParser: true})
  .then(()=> new ApolloServer({ typeDefs, resolvers }).listen()
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