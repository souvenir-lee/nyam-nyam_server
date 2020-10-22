const axios = require('axios');
axios.defaults.withCredentials = true;
const { user } = require('../../models');
const qs = require('qs');
const dotenv = require('dotenv');
require('dotenv').config();
const session = require('express-session');
// const { token } = require('morgan');
// const emailConfirm = require('../users/emailConfirm');

module.exports = {
  get: async (req, res) => {
    const clientID = process.env.KAKAO_CLIENT_ID;
    const clientSecret = process.env.KAKAO_CLIENT_SECRET;
    const redirectUri = process.env.KAKAO_REDIRECT_URI;
    const code = req.query.code;
    const main = 'http://localhost:3000';
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;
    if (code === undefined) {
      res.redirect(kakaoAuthUrl);
    }
    console.log('코드', code);
    console.log('세션', session);
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

      const access_token = tokenResponse.data;
      userResponse = await axios({
        method: 'POST',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
          Authorization: `Bearer ${access_token.access_token}`,
        },
        data: {
          property_keys: ['kakao_account.email'],
        },
      });
      const user_data = userResponse.data;
      console.log('엑세스토큰', access_token);
      console.log('유저', user_data);

      const findUser = await user.findOne({
        where: {
          password: user_data.id,
          social: 'kakao',
        },
      });

      if (findUser) {
        res.status(302).send({
          userdata: {
            username: user_data.properties.nickname,
            email: user_data.kakao_account.email,
            nickname: user_data.properties.nickname,
            password: user_data.id,
            userImg: user_data.properties.profile_image,
            access_token: access_token.access_token,
            refresh_token: access_token.refresh_token,
            social: 'kakao',
          },
        });
      } else {
        // console.log('엑세스토큰1', access_token);
        console.log(
          '유저2',
          user_data.properties.nickname,
          user_data.kakao_account.email,
          user_data.properties.nickname,
          user_data.id,
          user_data.properties.profile_image,
          access_token.access_token,
          access_token.refresh_token
        );
        user.create({
          username: user_data.properties.nickname,
          email: user_data.kakao_account.email,
          nickname: user_data.properties.nickname,
          password: user_data.id,
          userImg: user_data.properties.profile_image,
          access_token: access_token.access_token,
          refresh_token: access_token.refresh_token,
          social: 'kakao',
        });
        res.status(302).send('회원가입이 완료되었습니다');
      }
    } catch (error) {
      console.log('에러', error.data);
    }
  },
};
