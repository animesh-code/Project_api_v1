const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/userAuthController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(authController.accessToUser, userController.getUser)
  .patch(authController.accessToUser, userController.updateUser)
  .delete(authController.accessToUser, userController.deleteUser);

module.exports = router;
