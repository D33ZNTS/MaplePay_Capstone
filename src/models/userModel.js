// userModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  currentAddress: { type: String, required: true },
  amount: { type: Number, required: true },
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MonetaryOperation' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
