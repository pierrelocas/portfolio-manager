const { ApolloServer, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

require('dotenv').config() // dotenv package should be install on dev dependencies

const { HOST, PORT, DB_HOST, DB_USER, DB_PASS, DB_NAME, SECRET } = process.env

// TODO : try/catch here ? for validating token
// const getUser = token => token ? (jwt.verify(token, SECRET))._doc: null
// const getUser = async token =>{
  // try {
  //   const result = jwt.verify(token, SECRET)  // throw an error might be better to use a callback
  //   return result._doc
  // }catch(e){
  //   throw new Error({
  //     name: 'Token Invalid',
  //     message: 'ooops something went wrong !!!'
  //   })  // catch the error and throw a new one
  // }

  // try {
  //   console.log 
  //   const result = jwt.verify(token, SECRET)
  //   console.log(result)
  //   return result._doc
  // } 
  // catch { 
  //   throw new AuthenticationError('token validation error')
  // }

// } 

const getUser = token => new Promise((resolve, reject)=>{
  jwt.verify(token, SECRET, (err, decoded)=>
    err ? 
      reject('Invalid Token') :
      resolve(decoded) )
})


mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true`,{
   useNewUrlParser: true,
   useCreateIndex: true
  })
  .then(()=> new ApolloServer({
    typeDefs, 
    resolvers,
    // TODO : Only userid and roles in token because in case of update user info will change
    context : async ({req}) => {
      const BearerToken = await req.headers.authentication || '';
      const token = await BearerToken? BearerToken.split(" ")[1]: BearerToken
      const user = token ? await getUser(token) : null    // This is wrong null never get used because getUser throws an Error 
      if(!user) throw new AuthenticationError('You must be logged in.')
      return { user }
    }
  }).listen(PORT, HOST)
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  }))
  .catch(console.log)
