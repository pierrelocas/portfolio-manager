const gql = require('graphql-tag')

module.exports = gql`

  enum Currency {
    CAD
    USD
  }

  enum Exchange {
    NYSE
    NASDAQ
    TMX
  }

  type Portfolio {
    _id: ID!
    user_id: ID!
    name: String!
    exchange: Exchange!
    currency: Currency!
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    portfolios(user_id: ID!): [Portfolio!]
    portfolio(id: ID!): Portfolio!
  }

  extend type Mutation {
    createPortfolio(portfolio: PortfolioInput): Portfolio!
    updatePortfolio(id: ID!, portfolio: PortfolioInput): Portfolio!
    deletePortfolio(id: ID!): Boolean!
  }

  # Might be best to ommit the id in these cases, to be more reusable?
  input PortfolioInput{
    # user_id: ID!  current user extracted from context
    name: String! 
    exchange: Exchange!
    currency: Currency!
  }

`