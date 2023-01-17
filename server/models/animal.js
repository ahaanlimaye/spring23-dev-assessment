// dependency
const mongoose = require('mongoose');

// defines structuere of animal in database
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

// exports animal model to be used
module.exports = mongoose.model('Animal', animalSchema);