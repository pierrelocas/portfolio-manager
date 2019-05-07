const { 
  ApolloServer, 
  AuthenticationError, 
  ForbiddenError, 
  UserInputError 
} = require('apollo-server')

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

require('dotenv').config() // dotenv package should be install on dev dependencies

const { HOST, PORT, DB_HOST, DB_USER, DB_PASS, DB_NAME, SECRET } = process.env

const extractUserId = token => new Promise((resolve, reject)=>{
  jwt.verify(token, SECRET, (err, decoded)=>
    err
      ? reject('Invalid Token') 
      : resolve(decoded) 
  )
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
      const { headers : { authentication } } = req
      try{
        if (!authentication) throw 'No authenticaton property'
        
        const token = authentication.split(" ")[1]
        if (!token) throw 'Bearer token malformed'

        const { userId } = await extractUserId(token)

        return { userId, isSignedIn : true } 
      }catch(e){
        // console.log("error", e)
        return { isSignedIn : false }
      }

    }
  }).listen(PORT, HOST)
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  }))
  .catch(console.log)
