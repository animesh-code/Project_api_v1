const Place = require('../models/placeModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllPlaces = catchAsync(async (req, res, next) => {
  const places = await Place.find();

  res.status(200).json({
    status: 'success',
    results: places.length,
    data: {
      places
    }
  });
});

exports.getPlace = catchAsync(async (req, res, next) => {
  const place = await Place.findById(req.params.id);

  if (!place) {
    return next(new AppError('No place found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      place
    }
  });
});
exports.createPlace = catchAsync(async (req, res, next) => {
  const newPlace = await Place.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      place: newPlace
    }
  });
});
exports.updatePlace = catchAsync(async (req, res, next) => {
  const place = await Place.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!place) {
    return next(new AppError('No place found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      place
    }
  });
});
exports.deletePlace = catchAsync(async (req, res, next) => {
  const place = await Place.findByIdAndDelete(req.params.id);

  if (!place) {
    return next(new AppError('No place found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
