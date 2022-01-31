const mongoose = require('mongoose');
const Category = require('./productCategoryModel');

const productSchema = mongoose.Schema({
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category'
  },
  shop: {
    required: true,
    type: mongoose.Schema.ObjectId,
    ref: 'Shop'
  },
  name: {
    type: String,
    required: [true, 'Product name required']
  },
  quantity: {
    type: Number,
    default: 0
  },
  summary: {
    type: String,
    required: [true, 'Product summary required'],
    trim: true,
    maxlength: [10, 'Summary must have less or equal then 10 characters']
  },
  description: {
    type: String
  },
  coverImage: {
    type: String,
    required: [true, 'Product image required']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  price: {
    type: Number,
    required: [true, 'Product must have a price']
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function(val) {
        // this only points to current doc on NEW document creation
        return val < this.price;
      },
      message: 'Discount price ({VALUE}) should be below regular price'
    }
  }
});

productSchema.statics.calcProductQuantity = async function(categoryId) {
  const products = await this.aggregate([
    {
      $match: { category: categoryId }
    },
    {
      $group: {
        _id: '$category',
        nProducts: { $sum: 1 }
      }
    }
  ]);

  await Category.findByIdAndUpdate(categoryId, {
    itemQuantity: products[0].nProducts
  });
};

productSchema.post('save', function() {
  this.constructor.calcProductQuantity(this.category);
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
