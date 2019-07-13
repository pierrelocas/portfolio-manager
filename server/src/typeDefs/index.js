const gql = require('graphql-tag')


const base = gql`
  # interface MutationResponse {
  #   code: String!
  #   success: Boolean!
  #   message: String!
  # }

  type Query {
    _: String
  },
  type Mutation {
    _: String
  }
`

const typeDefs = [
  base,
  require('./user'),
  require('./portfolio'),
  require('./transaction')
]

module.exports =  typeDefs 