const ShopCategory = require('../models/shopCategoryModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createShopCategory = catchAsync(async (req, res, next) => {
  const newShopCategory = await ShopCategory.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      shopCategory: newShopCategory
    }
  });
});

exports.getShopCategories = catchAsync(async (req, res, next) => {
  const shopCategories = await ShopCategory.find();

  res.status(200).json({
    status: 'success',
    results: shopCategories.length,
    data: {
      shopCategories
    }
  });
});
exports.getShopCategory = catchAsync(async (req, res, next) => {
  const shopCategory = await ShopCategory.find();

  res.status(200).json({
    status: 'success',
    data: {
      shopCategory
    }
  });
});
exports.updateShopCategory = catchAsync(async (req, res, next) => {
  const shopCategory = await ShopCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!shopCategory) {
    return next(new AppError('No shop category found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      shopCategory
    }
  });
});
exports.deleteShopCategory = catchAsync(async (req, res, next) => {
  const shopCategory = await ShopCategory.findByIdAndDelete(req.params.id);

  if (!shopCategory) {
    return next(new AppError('No shop category found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
