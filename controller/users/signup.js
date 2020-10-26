module.exports = {
  post: async (req, res) => {
    const { user, store } = require('../../models');
    if (
      req.body === undefined ||
      req.body.userName === undefined ||
      req.body.email === undefined ||
      req.body.password === undefined ||
      req.body.stores === undefined
    ) {
      return res.status(400).send({ status: 'Invalid request' });
    }
    const {
      userName,
      email,
      password,
      stores,
      userImg,
    } = req.body;
    console.log('유저', req.body);

    try {
      const findUser = await user.findOne({
        where: { email: email },
      });
      
      if (findUser) {
        res.status(409).send('Existing local user');
      } 

      const createUser = await user.create({
        email: email,
        password: password,
        username: userName,
        userImg: userImg,
      });
      const findUserId = await user.findOne({
        where: {
          email: email,
        },
      });

      const createStore = await stores.map(el => {
        store.create({
          userId: findUserId.dataValues.id,
          storeName: el.id.place_name,
          storeAddress: el.id.address_name,
          latitude: el.id.coord.y,
          longitude: el.id.coord.x,
        })
      })

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
