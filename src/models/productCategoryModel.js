const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  shop: {
    type: mongoose.Schema.ObjectId,
    ref: 'Shop'
  },
  title: {
    type: String,
    unique: true,
    required: [true, 'Category title required']
  },
  itemQuantity: {
    type: Number,
    default: 0
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
