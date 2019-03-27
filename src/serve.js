const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
//const { typeDefs, resolvers } = require('./schema')

// TODO: Add NODE_ENV variable
// TODO: In prod might be better to cat env variable in package's scripts
const { parsed : ENV_CONFIG } = require('dotenv').config()
const { HOST, PORT, DB_HOST, DB_USER, DB_PASS, DB_NAME } = ENV_CONFIG

const { SECRET } = require('./config')

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true`,{
   useNewUrlParser: true,
   useCreateIndex: true
  })
  .then(()=> new ApolloServer({
    typeDefs, 
    resolvers,
    context : async ({req}) => {
      const BearerToken = req.headers.authentication || '';
      const token = BearerToken? BearerToken.split(" ")[1]: BearerToken
      const user = token? await (jwt.verify(token, SECRET))._doc: null
      return { user }
    }
  }).listen(PORT, HOST)
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  }))
  .catch(console.error)
