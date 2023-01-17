// dependency
const mongoose = require('mongoose');

// defines structure of training log in database
const trainingSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
  animal: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  trainingLogVideo: {
    type: String,
    required: false,
  }
});

// exports training log model to be used
module.exports = mongoose.model('Training', trainingSchema);