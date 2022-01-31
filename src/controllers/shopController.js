const Shop = require('../models/shopModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.aliasTrendingShops = (req, res, next) => {
  req.query.limit = '10';
  req.query.sort = '-ratingsAverage';
  req.query.fields = 'name,imageCover,ratingsAverage';
  next();
};

exports.getAllShops = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Shop.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const shops = await features.query;

  res.status(200).json({
    status: 'success',
    results: shops.length,
    data: {
      shops
    }
  });
});
exports.getShop = catchAsync(async (req, res, next) => {
  const shop = await Shop.findById(req.params.id).populate('categories');

  if (!shop) {
    return next(new AppError('No shop found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      shop
    }
  });
});
exports.createShop = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.updateShop = catchAsync(async (req, res, next) => {
  const shop = await Shop.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!shop) {
    return next(new AppError('No shop found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      shop
    }
  });
});
exports.deleteShop = catchAsync(async (req, res, next) => {
  const shop = await Shop.findByIdAndDelete(req.params.id);

  if (!shop) {
    return next(new AppError('No shop found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
