const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

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
    secret: 'session', //process.env.SESSION_SECRET,
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

// app.use('/', (req, res) => {
//   res.send('hello world');
// });

app.use('/users', usersRouter);
app.use('/social', socialRouter);
app.use('/search', searchRouter);
app.use('/predict', predictRouter);
app.use('/trend', trendRouter);
app.use('/info', infoRouter);
app.use('/editinfo', editInfoRouter);
app.use('/managemenu', manageMenuRouter);
app.use('/managestore', manageStoreRouter);
app.use('/update', updateSalesRouter);

app.listen(5000, () => {
  console.log('server on 5000');
});

module.exports = app;
