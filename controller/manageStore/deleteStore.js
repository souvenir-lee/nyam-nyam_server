// const { store } = require('../../models');
module.exports = {
  get: async (req, res) => {
    const { store } = require('../../models');
    if (
      req.body === undefined ||
      req.body.userId === undefined ||
      req.body.storeId === undefined
    ) {
      res.status(404).send('Bad Request');
    }
    const { userId, storeId } = req.body;
    console.log('바디바디', req.body);
    await store
      .destroy({
        where: {
          id: storeId,
          userId: userId,
        },
      })
      .then((result) => {
        if (result) {
          return res.send(200).send('가게가 삭제되었습니다.');
        } else {
          return res.status(400).send('Bad Request');
        }
      })
      .catch(() => {
        res.sendStatus(500);
      });
  },
};
