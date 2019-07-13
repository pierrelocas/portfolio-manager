const gql = require('graphql-tag')

module.exports = gql`
  type Position {
    stock: String!
    quantity: Int!
    price: Float!
    gainLoss: Float!
  }

  extend type Query {
    positions: (portfolioId: ID!): [Position],
    position: (portfolioId: ID!, stock: String!): Position
  }
`
