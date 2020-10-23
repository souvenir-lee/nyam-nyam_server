const jwt = require('jsonwebtoken');
const { user } = require('../models');
const tokenMiddleware = (req, res, next) => {
  console.log(req.headers);
  const access_token = req.headers['x-access-token'] 
  const refresh_token = req.headers['x-refresh-token'] 

  if (refresh_token === null) {
    console.log('refresh token 만료입니다');
    return res.redirect('/login');
  } else {
    if (req.body.social === 'kakao') {
      user
        .findOne({ where: { refresh_token: refresh_token } })
        .then((data) => data)
        .catch((err) => {
          console.log('소셜 로그인 정보를 못찾았습니다.', err);
          return res.status(401).json('소셜 로그인 중 refresh token이 없습니다.', err);
        });
    }
  }

  const generateToken = (user) => {
    if (user) {
      const access = 
        jwt.sign(
          { account: user.email, gmt: Date.now() },
          process.env.ACCESS_SECRET,
          {
            expiresIn: '15m',
            issuer: 'nyam-nyamServer',
          })
      const refresh = 
        jwt.sign(
          { account: user.email, gmt: Date.now() },
          process.env.REFRESH_SECRET,
          {
            expiresIn: '10 days',
            issuer: 'nyam-nyamServer',
          })
      const decoded = jwt.decode(refresh_token, {complete: true});
      const tokenGenerate = (access, refresh) => {
        let obj = {}
        obj['access_token'] = access
        obj['refresh_token'] = refresh
        obj['decoded'] = decoded.payload.account
        return obj
      }
      return tokenGenerate(access, refresh)
    } else {
      console.log('user 정보가 없습니다',user.dataValues);
      return res.status(404).send('user 정보가 없습니다');
    }
  };

  const respond = (token) => {
    console.log('token', token);
    user
      .update(
        { access_token: token.access_token, refresh_token: token.refresh_token },
        { where: { email: token.decoded } }
      )
      .then(() => {
        user
          .findOne({
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            where: { id: 1 },
          })
          .then((userdata) => {
            console.log(userdata.dataValues);
            req.headers['x-access-token'] = userdata.dataValues.access_token;
            req.headers['x-refresh-token'] = userdata.dataValues.refresh_token;
            console.log('token이 만료되어 업뎃하였습니다')
            next();
          })
          .catch((err) => {
            console.log('update 후 찾는데 오류', err);
            return res.status(500).send(err);
          });
      })
      .catch((err) => console.log('token update 오류', err));
  };

  user
    .findOne({ where: { access_token : access_token, refresh_token: refresh_token } })
    .then((data) => generateToken(data))
    .then((token) => respond(token))
    .catch((err) => {
      console.log('token update error', err)
      return res.status(500).json({'token update error': err})
    });
};

module.exports = tokenMiddleware;
