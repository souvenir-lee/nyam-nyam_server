'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', 
      [{
        email: '1111@test.com',
        password : process.env.TEMP,
        userName: "공용",
        userImg : null,
        social : null
      },
      {
        email: 'souvenir@test.com',
        password : process.env.TEMP,
        userName: "한슬",
        userImg : null,
        social : null
      },
      {
        email: 'sjkwan0922@test.com',
        password : process.env.TEMP,
        userName: "수진",
        userImg : null,
        social : null
      },
      {
        email: 'piecemakerz@test.com',
        password : process.env.TEMP,
        userName: "혁원",
        userImg : null,
        social : null
      },
      {
        email: 'lwd3737@test.com',
        password : process.env.TEMP,
        userName: "원동",
        userImg : null,
        social : null
      }], 
    {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'users',
      {
        userName: {
          [Op.in]: ["공용","한슬","수진","혁원","원동"],
        },
      },
      {}
    );
  }
};
