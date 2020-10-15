const { users } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
    get: (req, res) => {
        console.log('test')
        res.end();
    }
  };
  