const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Plant name is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  categories: [{
    type: String,
    required: true
  }],
  description: {
    type: String,
    trim: true
  },
  careInstructions: {
    type: String,
    trim: true
  },
  available: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/300x300?text=Plant+Image'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Plant', plantSchema);