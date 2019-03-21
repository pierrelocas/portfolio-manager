const { gql } = require('apollo-server');

const typeDefs = gql`
  # interface MutationResponse {
  #   code: String!
  #   success: Boolean!
  #   message: String!
  # }

  # TODO: Add language
  type User {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    createdAt: String
    updatedAt: String
  }

  # TODO: Add devise 
  type Portfolio {
    _id: ID!
    user_id: ID!
    name: String!
    createdAt: String
    updatedAt: String
  }

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

  type Token {
    token: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User

    portfolios(user_id: ID!): [Portfolio]
    portfolio(id: ID!): Portfolio

    transactions(portfolio_id: ID!): [Transaction]
    transaction(id: ID!): Transaction
  }

  type Mutation {
    signIn(email: String!, password: String!): Token!
    register(user: UserInput): Token!
    removeUser( id: ID! ): Boolean!
    modifyUser( id: ID!, user: UserInput!): Boolean!

    addPortfolio(portfolio: PortfolioInput): Portfolio!
    removePortfolio(id: ID!): Boolean!
    modifyPortfolio(id: ID!, portfolio: PortfolioInput): Portfolio!
  
    addTransaction(transaction: TransactionInput!): Transaction!
    removeTransaction(id: ID!): Boolean!
    modifyTransaction(id: ID!, transaction: TransactionInput!): Transaction!
  
  }

  # Does it worth it to have a specific input?
  # Might be best to ommit the id in these cases, to be more reusable?
  input PortfolioInput{
    user_id: ID!
    name: String! 
  }

  input TransactionInput{
    portfolio_id: ID!
    date: String!
    stock: String!
    quantity: Int!
    price: Float!
    commission: Float!
  }

  input UserInput{
    firstname: String! 
    lastname: String! 
    email: String! 
    password: String!
  }

  
`;

module.exports = typeDefs