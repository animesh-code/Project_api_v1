const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
    trim: true,
    minlength: [3, 'Name must have more or equal then 3 characters']
  },
  number: {
    type: String,
    required: [true, 'Number is required'],
    unique: true
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: [Number]
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
