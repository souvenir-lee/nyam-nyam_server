const jwt = require('jsonwebtoken');
const { user } = require('../models');

const tokenMiddleware = (req, res, next) => {
  console.log(req.headers);
  const access_token = req.headers['x-access-token'] || req.query.access_token;
  const refresh_token =
    req.headers['x-refresh-token'] || req.query.refresh_token;

  //auth에서 엑세스토큰이 없으면
  //리프레시가 있는지 확인후
  //엑세스 토큰을 업데이트하기
  //리프레시도 없으면 다시 로그인하도록 하기

  if (refresh_token === null || access_token === null) {
    console.log('refresh token 만료입니다');
    return res.redirect('/login');
  }

  const generateAccess = (user) => {
    if (user) {
      const access = new Promise((resolve, reject) => {
        jwt.sign(
          { account: user.email, gmt: Date.now() },
          process.env.ACCESS_SECRET,
          {
            expiresIn: '15m',
            issuer: 'nyam-nyamServer',
          },
          (err, token) => {
            if (err) reject(err);
            resolve(token);
          }
        );
      });
      return access;
    }
    console.log(user);
    console.log('user 정보가 없습니다');
    return res.status(404).send('토큰 확인 중, user 정보가 없습니다');
  };

  const respond = (token) => {
    console.log('token', token);
    user
      .update(
        { access_token: token },
        { where: { refresh_token: refresh_token } }
      )
      .then(() => {
        // console.log('업뎃후 token')

        user
          .findOne({
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            where: { refresh_token: refresh_token },
          })
          .then((userdata) => {
            console.log(userdata.dataValues);
            req.headers['x-refresh-token'] = userdata.dataValues.refresh_token;
            next();
            //return res.send('안녕하세요')
            console.log('결과', req.headers);
          })
          .catch((err) => {
            console.log('update 후 찾는데 오류', err);
            return res.status(500).send(err);
          });
      })
      .catch((err) => console.log('token update 오류', err));
  };

  user
    .findOne({ where: { refresh_token: refresh_token } })
    .then((data) => generateAccess(data))
    .then((token) => respond(token))
    .catch((err) => console.log('token update error', err));
  //next()
};

module.exports = tokenMiddleware;
