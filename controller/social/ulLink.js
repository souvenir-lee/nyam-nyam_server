const axios = require('axios');
axios.defaults.withCredentials = true;
const { user } = require('../../models');
const qs = require('qs');
const jwt = require('jsonwebtoken');
const session = require('express-session');
module.exports = {
  get: async (req, res) => {
    const session = req;
    console.log('콘솔', session);
  },
};
