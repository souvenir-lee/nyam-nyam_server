const tokenMiddleware = async (req, res, next) => {
  console.log(req.headers);
  const jwt = require('jsonwebtoken');
  const { user } = require('../models');
  require('dotenv').config();
  const access_token = req.headers['x-access-token'];
  const refresh_token = req.headers['x-refresh-token'];
  if (!refresh_token || !access_token) {
    console.log('refresh token이 없습니다');
    return res.status(404).json('잘못된 요청입니다. 토큰을 확인해주세요');
  }
  //액세스토큰 만료 재확인하기
  const checkAccessToken = () => {
    const access = new Promise((resolve, reject) => {
      jwt.verify(
        access_token,
        process.env.ACCESS_SECRET,
        {
          expiresIn: '15m',
          issuer: 'nyam-nyamServer',
        },
        (err, decode) => {
          if (err) {
            reject(err);
          } else {
            resolve(decode);
            return res.status(200).json('access 문제없음');
          }
        }
      );
    });
    return access;
  };
  //리프레시 토큰 만료 재확인하기
  const checkRefreshToken = () => {
    const refresh = new Promise((resolve, reject) => {
      jwt.verify(
        refresh_token,
        process.env.REFRESH_SECRET,
        {
          expiresIn: '10 days',
          issuer: 'nyam-nyamServer',
        },
        (err, decode) => {
          if (err) {
            reject(err);
          } else {
            console.log('refresh');
            resolve(decode);
            return res.status(200).json('refresh 문제없음');
          }
        }
      );
    });
    return refresh;
  };
  //액세스 토큰 에러 메세지
  const onAccessError = (error) => {
    console.log('여기인건가~~~~');
    if (error.message === 'jwt expired') {
      console.log('auth access error', error.message);
      checkRefreshToken().catch(onRefreshError);
    } else {
      return res.status(403).json({ 'token 유효성 에러': error.message });
    }
  };
  //refresh 토큰 에러
  const onRefreshError = async (error) => {
    console.log('여기인건가~~~~');
    if (error.message === 'jwt expired') {
      console.log('auth refresh error', error.message);
      const decoded = jwt.decode(refresh_token, { complete: true });
      let userData = decoded.payload.account;
      let generate = generateToken(userData);
      respond(generate);
    } else {
      return res.status(403).json({ 'token 유효성 에러': error.message });
    }
  };
  const generateToken = (user) => {
    if (user) {
      const access = jwt.sign(
        { account: user, gmt: Date.now() },
        process.env.ACCESS_SECRET,
        {
          expiresIn: '100m',
          issuer: 'nyam-nyamServer',
        }
      );
      const refresh = jwt.sign(
        { account: user, gmt: Date.now() },
        process.env.REFRESH_SECRET,
        {
          expiresIn: '10 days',
          issuer: 'nyam-nyamServer',
        }
      );
      const tokenGenerate = (access, refresh) => {
        let obj = {};
        obj['access_token'] = access;
        obj['refresh_token'] = refresh;
        obj['decoded'] = user;
        return obj;
      };
      return tokenGenerate(access, refresh);
    } else {
      console.log('user 정보가 없습니다');
      return res.status(404).send('user 정보가 없습니다');
    }
  };
  const respond = (token) => {
    console.log('token', token);
    user
      .update(
        {
          access_token: token.access_token,
          refresh_token: token.refresh_token,
        },
        { where: { email: token.decoded } }
      )
      .then((id) => {
        user
          .findOne({
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            where: { id: id },
          })
          .then((userdata) => {
            console.log(userdata.dataValues);
            console.log('token이 만료되어 업뎃하였습니다');
            return res.status(201).json({
              access_token: userdata.dataValues.access_token,
              refresh_token: userdata.dataValues.refresh_token,
            });
          })
          .catch((err) => {
            console.log('update 후 찾는데 오류', err);
            return res.status(500).send(err);
          });
      })
      .catch((err) => console.log('token update 오류', err));
  };

  await checkAccessToken().catch(onAccessError);
  await checkRefreshToken().catch(onRefreshError);
  next();
};
module.exports = tokenMiddleware;
