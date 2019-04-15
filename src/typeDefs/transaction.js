const gql = require('graphql-tag')

module.exports = gql`
  type Transaction {
    _id: ID!
    portfolio_id: ID!
    date: String!
    stock: String!
    quantity: Int!
    price: Float!
    commission: Float
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    transactions(portfolio_id: ID!): [Transaction!]
    transaction(id: ID!): Transaction!
  }

  extend type Mutation {
    createTransaction(transaction: TransactionInput!): Transaction!
    updateTransaction(id: ID!, transaction: TransactionInput!): Transaction!
    deleteTransaction(id: ID!): Boolean!
  }

  input TransactionInput{
    portfolio_id: ID!
    date: String!
    stock: String!
    quantity: Int!
    price: Float!
    commission: Float!
  }  
  
`