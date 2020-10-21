module.exports = {
  post: async (req, res) => {
    const { user, store } = require('../../models');
    if (
      req.body === undefined ||
      req.body.userName === undefined ||
      req.body.email === undefined ||
      req.body.password === undefined ||
      req.body.storeName === undefined ||
      req.body.storeAddress === undefined ||
      req.body.latitude === undefined ||
      req.body.longitude === undefined
    ) {
      return res.status(400).send({ status: 'Invalid request' });
    }
    const {
      userName,
      nickName,
      email,
      password,
      storeName,
      storeAddress,
      latitude,
      longitude,
      userImg,
    } = req.body;
    console.log('유저', req.body);

    try {
      const createUser = await user.create({
        email: email,
        password: password,
        username: userName,
        nickname: nickName,
        userImg: userImg,
      });
      const findUserId = await user.findOne({
        where: {
          email: email,
        },
      });

      const createStore = await store.create({
        userId: findUserId.dataValues.id,
        storeName: storeName,
        storeAddress: storeAddress,
        latitude: latitude,
        longitude: longitude,
      });
      console.log('유저부분', createUser);
      console.log('유저아이디찾자', findUserId.dataValues.id);
      console.log('가게부분', createStore);
      res.status(200).send('회원가입이 완료되었습니다.');
    } catch (err) {
      console.log(err);
      res.status(401).send('Bad Request');
    }
  },
};
