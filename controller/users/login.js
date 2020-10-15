module.exports = {
  post: (req, res) => {
    const { user } = require('../../models');
    const { v4 } = require('uuid')
    const jwt = require('jsonwebtoken')
    const crypto = require('crypto')

    console.log('login 들어왔음', typeof user)
    /*
    (프론트 측에서 구현하는 자동로그인의 경우는 일단 제외하기)
    1. 해당 이메일, 비번이 있는지 확인한다(sequelize findOne)
        1-1. 전달된 정보가 없으면 400
        1-1. 정확한 정보가 아니라면 404 Invalid request
    2. 해당 정보가 있으면
    3. access, refresh token을 부여한다. 
        access token은 30분이 완료인가? 일단 이것도 30분 기준으로 만들어두고 변경하면서 확인해보자
    4. access token이 만료되어 다시 요청이 들어오면, refresh token을 통해 확인한다.
    5. refresh token도 만료가 되면 인증 과정(은 어떤것?)을 통해 재발급 한다.
        refresh token은 로그인을 하지 않을 일자를 기준으로 1주일이 지나면 하는 것으로 하는 건 어떨까?
    */

    //1-1. 전달된 정보가 없으면 400
    if(
      req.body === undefined || 
      req.body.email === undefined || 
      req.body.password === undefined) {
        return res.status(400).send({stats: 'Invalid Request'});
    }

    const { email, password } = req.body
    const uuidNew = v4();

    //access token 만들어 응답하는 콜백 함수
    const generateAccess = (userData) => {
      const payload = {account : email, uuid: uuidNew, gmt: Date.now()} //uuid: uuidNew,
      const secert = process.env.ACCESS_SECRET;
      const option = {
        expiresIn : '5m',
        issuer : 'nyam-nyamServer',
      };
      jwt.sign(payload, secert, option, (err, token) => {
        if(err) console.log(err);
        else{
          userData['password'] ? delete userData['password'] : false;
          userData['token'] ? delete userData['token'] : false;
          return res.status(200).json({
            userData : userData,
            token : token,
            stauts : 'Login Complete'
          })
        }
      })
    }

    //generateAccess(req.body);

    //1. 해당 이메일, 비번이 있는지 확인한다(sequelize findOne)
    //1-1. 정확한 정보가 아니라면 404 Invalid request
    user
      .findOne({
        raw: true,
        where : {
          email : email,
          password : password
        }
      })
      .then((data) => {
        if (data === null) {
          return res.status(404).send({status : "Invalid Request"})
        } else {
          //refreshIoken 발행
          //근데 여기에 넣으면 access랑 차이가 뭐지?
          const refreshToken = data.token
          if(refreshToken === null) {
            let secret = process.env.REFRESH_SECRET;
            let hash = crypto
              .createHmac('sha256', secret)
              .update(
                String(data.email) +
                  Date().split(' ')[1] +
                  Date().split(' ')[4]
              )
              .digest('hex');

            user 
              .update(
                { token : hash,
                  updateAt: Date.now()
                },
                { where : { email : email} }
              )
              .then((update) => {
                if(update !== 0) {
                  console.log('refreshToken update')

                  user
                  .findOne({
                    raw: true,
                    where: { email : email},
                  })
                  .then((userdata) => generateAccess(userdata))
                  .catch(err => res.status(500).send(err))
                } else {
                    console.log('refreshToken update err')
                }
              })
          } else {
            generateAccess(data);
          }
        }
      })
      .catch((err) => {
        console.log('유저를 못찾은 것 같음', err)
        return res.status(500).send(err)
      })
  }
};
  