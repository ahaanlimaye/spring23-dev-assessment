const mongoose = require('mongoose');

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

module.exports = mongoose.model('Training', trainingSchema);