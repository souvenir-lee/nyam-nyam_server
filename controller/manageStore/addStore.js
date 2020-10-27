const { store } = require('../../models');
module.exports = {
  post: async (req, res) => {
    const { userId, storeName, storeAddress, latitude, longitude } = req.body;

    const createStore = await store
      .create({
        userId: userId,
        storeName: storeName,
        storeAddress: storeAddress,
        latitude: latitude,
        longitude: longitude,
      })
      .then((result) => {
        if (result) {
          res.status(200).send('추가되었습니다.');
        } else {
          res.status(400).send('Bad Request');
        }
      })
      .catch(() => {
        res.sendStatus(500);
      });
  },
};
