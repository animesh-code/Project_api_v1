const express = require('express');
const gigController = require('../controllers/gigController');

const router = express.Router();

router
  .route('/')
  .get(gigController.getAllGigs)
  .post(gigController.createGig);
router
  .route('/:id')
  .get(gigController.getGig)
  .patch(gigController.updateGig)
  .delete(gigController.deleteGig);

module.exports = router;
