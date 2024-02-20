const User = require('../models/userModel');
const MonetaryOperation = require('../models/monetaryOperationModel');

const resolvers = {
  Query: {
    getUserBalance: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error('User not found');
        }
        return user.amount;
      } catch (error) {
        console.error('Error fetching user balance:', error.message);
        throw new Error('Failed to fetch user balance');
      }
    },
    // Add other query resolvers here if needed
  },
  
  Mutation: {
    addMonetaryOperation: async (_, { operationType, amount }) => {
      try {
        const newMonetaryOperation = new MonetaryOperation({ operationType, amount });
        const savedMonetaryOperation = await newMonetaryOperation.save();
        return savedMonetaryOperation;
      } catch (error) {
        console.error('Error adding new monetary operation:', error.message);
        throw new Error('Failed to add new monetary operation');
      }
    },
    withdraw: async (_, { userId, amount }) => {
      try {
        const user = await User.findById(userId);

        if (!user) {
          throw new Error('User not found');
        }

        if (user.amount < amount) {
          throw new Error('Insufficient balance for withdrawal');
        }

        user.amount -= amount;
        await user.save();

        const newMonetaryOperation = new MonetaryOperation({ operationType: 'withdrawal', amount });
        const savedMonetaryOperation = await newMonetaryOperation.save();
        return savedMonetaryOperation;
      } catch (error) {
        console.error('Error withdrawing money:', error.message);
        throw new Error('Failed to withdraw money');
      }
    },
    deposit: async (_, { userId, amount }) => {
      try {
        const user = await User.findById(userId);

        if (!user) {
          throw new Error('User not found');
        }

        user.amount += amount;
        await user.save();

        const newMonetaryOperation = new MonetaryOperation({ operationType: 'deposit', amount });
        const savedMonetaryOperation = await newMonetaryOperation.save();
        return savedMonetaryOperation;
      } catch (error) {
        console.error('Error depositing money:', error.message);
        throw new Error('Failed to deposit money');
      }
    },
    transfer: async (_, { senderId, recipientId, amount }) => {
      try {
        const sender = await User.findById(senderId);
        const recipient = await User.findById(recipientId);

        if (!sender || !recipient) {
          throw new Error('Sender or recipient not found');
        }

        if (sender.amount < amount) {
          throw new Error('Insufficient balance for transfer');
        }

        sender.amount -= amount;
        recipient.amount += amount;

        await sender.save();
        await recipient.save();

        const newMonetaryOperation = new MonetaryOperation({
          operationType: 'transfer',
          amount,
        });

        const savedMonetaryOperation = await newMonetaryOperation.save();
        return savedMonetaryOperation;
      } catch (error) {
        console.error('Error transferring money:', error.message);
        throw new Error('Failed to transfer money');
      }
      
    },
    // Other mutation resolvers...
  },
};

module.exports = resolvers;
