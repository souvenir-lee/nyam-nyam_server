module.exports = {
  post: async (req, res) => {
    const { user } = require('../../models');
    const access_token = req.headers['x-access-token'];
    const refresh_token = req.headers['x-refresh-token'];
    console.log('엑세스', access_token);
    console.log('리프레쉬', refresh_token);
    // if (
    //   req.body.userId === undefined ||
    //   access_token === undefined ||
    //   refresh_token ||
    //   undefined
    // ) {
    //   res.status(404).send('Bad Request');
    // }
    const findUser = await user
      .findOne({
        where: {
          id: req.body.userId,
        },
      })
      .then((findUser) => {
        if (findUser) {
          user.update(
            {
              access_token: null,
              refresh_token: null,
            },
            { where: { id: findUser.dataValues.id } }
          );
          res.status(200).send('로그아웃 되었습니다');
        } else {
          return res.status(400).json({
            status: 'Invalid request',
          });
        }
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  },
};
