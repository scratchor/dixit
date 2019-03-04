const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const CardsSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('cards', CardsSchema);
