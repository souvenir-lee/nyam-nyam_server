const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

const authMiddleware = require('./middleware/auth');
// const tokenMiddleware =require('./middleware/token')
const usersRouter = require('./routes/users');
const socialRouter = require('./routes/social');
const searchRouter = require('./routes/search');
const predictRouter = require('./routes/predict');
const trendRouter = require('./routes/trend');
const infoRouter = require('./routes/info');
const editInfoRouter = require('./routes/editInfo');
const manageMenuRouter = require('./routes/manageMenu');
const manageStoreRouter = require('./routes/manageStore');
const updateSalesRouter = require('./routes/updateSales');

const app = express();
app.use(morgan('nyamnyam'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
    method: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    rolling: true, // maxAge -> 갱신
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 60000 * 30, // 30분간 세션 유지
      // sameSite: 'lax',
    },
  })
);

// app.use('*', authMiddleware)
//app.use('/token', tokenMiddleware)

app.use('/users', usersRouter);
app.use('/social', socialRouter);

//app.use('*', authMiddleware);

app.use('/search', authMiddleware, searchRouter);
app.use('/predict', authMiddleware, predictRouter);
app.use('/trend', authMiddleware, trendRouter);
app.use('/info', authMiddleware, infoRouter);
app.use('/editinfo', authMiddleware, editInfoRouter);
app.use('/managemenu', authMiddleware, manageMenuRouter);
app.use('/managestore', authMiddleware, manageStoreRouter);
app.use('/update', authMiddleware, updateSalesRouter);

app.listen(4000, () => {
  console.log('server on 4000');
});

module.exports = app;
