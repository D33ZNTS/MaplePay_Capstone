const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    gender: String!
    email: String!
    password: String!
    currentAddress: String!
    amount: Float!
    contacts: [User]!
    transactions: [MonetaryOperation]!
  }

  type MonetaryOperation {
    _id: ID!
    type: String!
    amount: Float!
    date: String!
  }

  type Query {
    getAllUsers: [User]!
    getUserById(_id: ID!): User
    getAllMonetaryOperations: [MonetaryOperation]!
    getMonetaryOperationById(_id: ID!): MonetaryOperation
    getUserBalance(userId: ID!): Float!  # Query to get user balance
  }

  type Mutation {
    addUser(
      name: String!
      gender: String!
      email: String!
      password: String!
      currentAddress: String!
      amount: Float!
    ): User!
    updateUser(
      _id: ID!
      name: String
      gender: String
      email: String
      password: String
      currentAddress: String
      amount: Float
    ): User!
    deleteUserById(_id: ID!): User!

    addMonetaryOperation(
      type: String!
      amount: Float!
      date: String!
    ): MonetaryOperation!
    deleteMonetaryOperationById(_id: ID!): MonetaryOperation!
    
    # Include the login mutation
    login(email: String!, password: String!): String!

    # Mutation to perform a withdrawal from the user's account
    withdraw(userId: ID!, amount: Float!): MonetaryOperation!

    # Include the deposit mutation
    deposit(userId: ID!, amount: Float!): MonetaryOperation!
  
    # Mutation to transfer money from the user's account to another user's account
    transfer(
      recipientId: ID! # ID of the recipient user
      amount: Float!    # Amount to transfer
    ): MonetaryOperation!
  }
`;

module.exports = typeDefs;
