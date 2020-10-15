module.exports = {
  post: async (req, res) => {
    const { user } = require('../../models');
    if (
      req.body === undefined ||
      req.body.username === undefined ||
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
      username,
      email,
      password,
      storeName,
      storeAddress,
      latitude,
      longitude,
    } = req.body;
    await user.findOrCreate({
      raw: true,
      where: { email: email },
      defaults: { username: username, password: password },
    });
  },
};
