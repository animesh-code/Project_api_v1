const express = require('express');
const shopController = require('../controllers/shopController');
const authController = require('../controllers/shopAuthController');
const productRouter = require('../routes/productRoutes');
const categoryRouter = require('../routes/productCategoryRoutes');

const router = express.Router();

router.use('/:shopId/products', productRouter);
router.use('/:shopId/categories', categoryRouter);

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

router
  .route('/')
  .get(shopController.getAllShops)
  .post(shopController.createShop);
router
  .route('/:id')
  .get(shopController.getShop)
  .patch(shopController.updateShop)
  .delete(shopController.deleteShop);

module.exports = router;
