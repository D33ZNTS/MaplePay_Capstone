const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const resolvers = {
  Mutation: {
    addUser: async (_, { name, gender, email, password, currentAddress, amount }) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, gender, email, password: hashedPassword, currentAddress, amount });
        const savedUser = await newUser.save();
        return savedUser;
      } catch (error) {
        console.error('Error adding new user:', error.message);
        throw new Error('Failed to add new user');
      }
    },
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        
        if (!user) {
          throw new Error('User not found');
        }
        
        const validPassword = await bcrypt.compare(password, user.password);
        
        if (!validPassword) {
          throw new Error('Invalid password');
        }
        
        const token = jwt.sign({ userId: user._id }, 'your_secret_key_here', { expiresIn: '1h' });
        
        return token;
      } catch (error) {
        console.error('Error during login:', error);
        throw new Error('Login failed');
      }
    }
  },
  User: {
    contacts: async (user) => {
      try {
        const contacts = await User.find({ _id: { $ne: user._id } });
        return contacts;
      } catch (error) {
        console.error('Error fetching contacts:', error);
        throw new Error('Failed to fetch contacts');
      }
    },
  }
};

module.exports = resolvers;
