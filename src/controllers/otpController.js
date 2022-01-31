const Vonage = require('@vonage/server-sdk');
const Twilio = require('twilio');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET
});

// const client = Twilio();

exports.sendOtp = catchAsync(async (req, res, next) => {
  const { number } = req.body;
  const reqObject = {
    brand: process.env.BRAND,
    number: number,
    sender_id: process.env.SENDER_ID,
    pin_expiry: process.env.PIN_EXPIRY,
    next_event_wait: process.env.NEXT_EVENT_WAIT,
    workflow_id: process.env.WORKFLOW_ID
  };

  await vonage.verify.request(reqObject, (err, result) => {
    if (err) {
      return next(new AppError(err.error_text, 400));
    }

    if (result.status === '0') {
      res.status(200).json({
        status: 'success',
        data: {
          request_id: result.request_id
        }
      });
    } else {
      return next(new AppError(result.error_text, 400));
    }
  });
});

exports.checkOtp = catchAsync(async (req, res, next) => {
  const { request_id, code } = req.body;
  const reqObject = {
    request_id: request_id,
    code: code
  };
  await vonage.verify.check(reqObject, (err, result) => {
    if (err) {
      return next(new AppError(err.error_text, 400));
    }

    if (result.status === '0') {
      res.status(200).json({
        status: 'success',
        data: {
          result
        }
      });
    } else {
      return next(new AppError(result.error_text, 400));
    }
  });
});

exports.cancelOtp = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};

exports.resendOtp = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
