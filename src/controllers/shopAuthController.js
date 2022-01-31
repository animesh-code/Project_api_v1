const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const Shop = require('../models/shopModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.register = catchAsync(async (req, res, next) => {
  const newShop = await Shop.create(req.body);

  const token = signToken(newShop._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      shop: newShop
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { number } = req.body;

  if (!number) {
    return next(new AppError('Please provide mobile number', 400));
  }

  const shop = await Shop.findOne({ number });

  if (!shop) {
    return next(new AppError('Incorrect mobile number', 401));
  }

  const token = signToken(shop._id);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      shop
    }
  });
});

exports.accessToShop = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if shop still exists
  const currentShop = await Shop.findById(decoded.id);
  if (!currentShop) {
    return next(
      new AppError(
        'The shop belonging to this token does no longer exist.',
        401
      )
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.shop = currentShop;
  next();
});
