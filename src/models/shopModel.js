const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema(
  {
    shopCategory: {
      type: mongoose.Schema.ObjectId,
      ref: 'ShopCategory'
      // required: true
    },
    name: {
      type: String,
      required: [true, 'Shop must have a name'],
      trim: true,
      maxlength: [30, 'Shop name must have less or equal then 30 characters'],
      minlength: [5, 'Shop name must have more or equal then 10 characters']
    },
    number: {
      type: String,
      unique: true,
      required: [true, 'Number is required']
    },
    slug: String,
    imageCover: {
      type: String,
      default: ''
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0']
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      address: String
    },
    minOrder: {
      type: Number,
      default: 0,
      enum: [0, 50, 100, 150, 500, 1000]
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

shopSchema.virtual('categories', {
  ref: 'Category',
  foreignField: 'shop',
  localField: '_id'
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
