const gql = require('graphql-tag')

module.exports = gql`
  enum Language {
    enUS
    frCA
    esES
  }

  type User {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    confirmed: Boolean
    language: Language!
    createdAt: String!
    updatedAt: String!
  }

  type Token {
    token: String!
  }

  extend type Query {
    users: [User]
    me: User
  }

  extend type Mutation {
    signIn(email: String!, password: String!): Token!
    signUp(user: UserInput): Token!
    # signOut: Boolean!
    updateUser(id: ID!, update: UserInput!): Boolean!
    deleteUser(id: ID!): Boolean!
    confirmEmail(token: String!): Boolean!
    resetPasswordRequest(email: String!): Boolean!
    resetPassword(token: String!, password: String!): Boolean!
  }

  input UserInput {
    firstname: String
    lastname: String
    email: String
    confirmed: Boolean
    password: String
    language: Language
  }
`
