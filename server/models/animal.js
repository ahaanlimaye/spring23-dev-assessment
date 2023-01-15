const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hoursTrained: {
    type: Number,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  profilePicture: {
    type: String,
    required: false,
  }
});

module.exports = mongoose.model('Animal', animalSchema);