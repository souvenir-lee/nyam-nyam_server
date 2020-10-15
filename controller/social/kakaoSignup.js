const axios = require('axios');
axios.defaults.withCredentials = true;
const { user } = require('../../models');
const qs = require('qs');
const jwt = require('jsonwebtoken');
const session = require('express-session');
// const { token } = require('morgan');
// const emailConfirm = require('../users/emailConfirm');

module.exports = {
  get: async (req, res) => {
    const clientID = process.env.KAKAO_CLIENT_ID;
    const clientSecret = process.env.KAKAO_CLIENT_SECRET;
    const redirectUri = process.env.KAKAO_REDIRECT_URI;
    const code = req.query.code;
    // const main = 'http://localhost:4000';
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;
    if (code === undefined) {
      res.redirect(kakaoAuthUrl);
    }
    console.log('코드', code);
    console.log('세션', session);
    const linkUser = (session, provider, authData) => {
      let result = false;
      if (session.authData) {
        if (session.authData[provider]) {
          // 이미 계정에 provider 가 연결되어 있는 경우
          return result;
        }

        session.authData[provider] = authData;
      } else {
        session.authData = {
          [provider]: authData,
        };
      }

      result = true;
      console.log('세션', session.authData);
      return result;
    };
    try {
      tokenResponse = await axios({
        method: 'POST',
        url: 'https://kauth.kakao.com/oauth/token',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
          grant_type: 'authorization_code',
          client_id: clientID,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          code,
        }),
      });
    } catch (error) {
      return res.json(error.data);
    }
    const access_token = tokenResponse.data;
    console.log('엑세스토큰', access_token);

    try {
      userResponse = await axios({
        method: 'GET',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      // .then((result) => {
      //     if (result) {
      //       const email = `kakao.com@testuser`;
      //       const grantAccessToken = (status, location) => {
      //         const userInfo = {
      //           account: email,
      //           gmt: Date().split(' ')[5],
      //         };
      //         const privateKey = process.env.ACCESS_SECRET + Date().split(' ')[1];
      //         const option = { expiresIn: '5m' };
      //         jwt.sign(userInfo, privateKey, option, function (err, token) {
      //           if (err) {
      //             console.log(token);
      //           } else {
      //             req.session.userId = token;
      //             return res.status(status).redirect(location);
      //           }
      //         });
      //       };
      //     }
      //   });
      console.log('유저', userResponse);
    } catch (error) {
      return res.json(error.data);
    }
    // user
    //   .findOrCreate({
    //     where: {
    //       email: email,
    //     },
    //     defaults: {
    //       username: 'kakaoTestUser',
    //       password: 'kakaoTestUser',
    //       token: 'N/A',
    //     },
    //   })
    //   .then(([data, created]) => {
    //     if (created) {
    //       grantAccessToken(301, '/social/registered');
    //     } else {
    //     }
    //   });

    // res.redirect(main);
  },
};
