const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  city: {
    type: String,
    unique: true,
    required: [true, 'City name required']
  },
  district: {
    type: String,
    required: [true, 'District name required']
  },
  state: {
    type: String,
    required: [true, 'State name required']
  },
  country: {
    type: String,
    required: [true, 'Country name required']
  }
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
