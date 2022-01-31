const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const adminRouter = require('./routes/adminRoutes');
const otpRouter = require('./routes/otpRoutes');
const placeRouter = require('./routes/placeRoutes');
const shopCategoryRouter = require('./routes/shopCategoryRoutes');
const shopRouter = require('./routes/shopRoutes');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const gigRouter = require('./routes/gigRoutes');

const app = express();

// MIDDLEWARE

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use('/admin', adminRouter);
app.use('/api/v1/otp', otpRouter);
app.use('/api/v1/places', placeRouter);
app.use('/api/v1/shopCategories', shopCategoryRouter);
app.use('/api/v1/shops', shopRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/gigs', gigRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
