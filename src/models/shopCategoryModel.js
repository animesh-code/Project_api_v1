const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, 'Category title required']
  },
  image: {
    type: String,
    default: ''
  }
});

const ShopCategory = mongoose.model('ShopCategory', categorySchema);

module.exports = ShopCategory;
