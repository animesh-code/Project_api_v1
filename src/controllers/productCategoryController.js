const Category = require('../models/productCategoryModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllProductCategories = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.shopId) filter = { shop: req.params.shopId };

  const productCategories = await Category.find(filter);

  res.status(200).json({
    status: 'success',
    results: productCategories.length,
    data: {
      categories: productCategories
    }
  });
});

exports.createProductCategory = catchAsync(async (req, res, next) => {
  if (!req.body.shop) req.body.shop = req.params.shopId;

  const newProductCategory = await Category.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      category: newProductCategory
    }
  });
});

exports.getProductCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!product) {
    return next(new AppError('No category found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      category
    }
  });
});
exports.updateProductCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!category) {
    return next(new AppError('No category found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      category
    }
  });
});
exports.deleteProductCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(new AppError('No category found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
