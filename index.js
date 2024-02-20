const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const typeDefs = require('./src/schema/schema');
const userResolver = require('./src/resolvers/userResolver');
const monetaryOperationResolver = require('./src/resolvers/monetaryOperationResolver'); // Import the monetary operation resolver
const bcrypt = require('bcrypt');

const app = express();

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/MaplePay_Capstone', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000 
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error(error));

const server = new ApolloServer({
  typeDefs,
  resolvers: [userResolver, monetaryOperationResolver] // Include the monetary operation resolver here
});

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
