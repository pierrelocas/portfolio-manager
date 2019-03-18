const { gql } = require('apollo-server');

const typeDefs = gql`
  # interface MutationResponse {
  #   code: String!
  #   success: Boolean!
  #   message: String!
  # }

  type User {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
  }

  type Portfolio {
    id: ID!
    user_id: ID!
    name: String!
  }

  type Transaction {
    id: ID!
    portfolio_id: ID!
    date: String!
    stock: String!
    quantity: Int!
    price: Float!
    commission: Float
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
    signIn(email: String!, password: String!): User!
    register(user: UserInput): User
    removeUser( id: ID! ): Boolean
    modifyUser( id: ID!, user: UserInput!): Boolean

    addPortfolio(user_id: ID!, name: String!): Portfolio!
    removePortfolio(id: ID!): [Portfolio]!
    modifyPortfolio(portfolio: PortfolioInput): [Portfolio]!
  
    addTransaction(transaction: TransactionInput!): [Transaction]!
    removeTransaction(id: ID!): [Transaction]!
    modifyTransaction(id: ID!, transaction: TransactionInput!): [Transaction]!
  
  }

  # Does it worth it to have a specific input?
  # Might be best to ommit the id in these cases, to be more reusable?
  input PortfolioInput{
    id: ID!
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