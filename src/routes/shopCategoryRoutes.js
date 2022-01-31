const express = require('express');
const shopCategoryController = require('../controllers/shopCategoryController');

const router = express.Router();

router
  .route('/')
  .get(shopCategoryController.getShopCategories)
  .post(shopCategoryController.createShopCategory);

router
  .route('/:id')
  .get(shopCategoryController.getShopCategory)
  .patch(shopCategoryController.updateShopCategory)
  .delete(shopCategoryController.deleteShopCategory);

module.exports = router;
