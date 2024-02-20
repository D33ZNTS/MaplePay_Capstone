// monetaryOperationModel.js

const mongoose = require('mongoose');

const monetaryOperationSchema = new mongoose.Schema({
  operationType: { type: String, required: true }, // e.g., transfer, withdrawal, deposit
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const MonetaryOperation = mongoose.model('MonetaryOperation', monetaryOperationSchema);

module.exports = MonetaryOperation;
