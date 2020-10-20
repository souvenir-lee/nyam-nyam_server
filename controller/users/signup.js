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
    console.log(req.body);

    try {
      await user.create({
        email: email,
        password: password,
        username: userName,
        nickname: nickName,
        userImg: userImg,
      });
      await user.findOne({});
    } catch (err) {
      console.log(err);
    }
  },
};

// default: {
//   email: email,
//   password: password,
//   username: userName,
//   nickname: nickName,
//   userImg: userImg,
//   access_token: null,
//   refresh_token: null,
//   social: null,
//   store: {
//     storeName: storeName,
//     storeAddress: storeAddress,
//     latitude: latitude,
//     longitude: longitude,
//   },
// },
// {
//   include: [store],
// }
