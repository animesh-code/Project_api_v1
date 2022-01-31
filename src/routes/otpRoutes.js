const express = require('express');
const otpController = require('../controllers/otpController');

const router = express.Router();

router.route('/send').post(otpController.sendOtp);
router.route('/check').post(otpController.checkOtp);

module.exports = router;
