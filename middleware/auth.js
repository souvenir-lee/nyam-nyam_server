const authMiddleware = (req, res, next) => {
  const jwt = require('jsonwebtoken');
  const tokenMiddleware = require('../middleware/token');
  const dotenv = require('dotenv');
  require('dotenv').config();
  console.log('auth req.body', req.body);
  const access_token = req.headers['x-access-token'] || req.query.access_token;

  // token does not exist
  if (!access_token) {
    return res.status(403).json('access token이 없거나 로그인 되지 않았습니다');
  }

  // create a promise that decodes the token
  const checkAccess = new Promise((resolve, reject) => {
    const secret = process.env.ACCESS_SECRET;
    const option = {
      expiresIn: '15m',
      issuer: 'nyam-nyamServer',
    };
    jwt.verify(access_token, secret, option, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });

  const onError = (error) => {
    //access token가 만료되었다면
    if (error.message === 'jwt expired') {
      console.log('auth error', error.message);
      tokenMiddleware(req, res, next);
    } else {
      return res.status(404).send(error);
    }
  };

  //process the promise
  checkAccess
    .then((decoded) => {
      // console.log('여기는 안찍이니',decoded)
      req.decoded = decoded;
      next();
    })
    .catch(onError);
};

module.exports = authMiddleware;
