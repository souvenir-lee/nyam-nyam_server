'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', 
    [{
      email: '1111@test.com',
      password : process.env.TEMP,
      userName: "테스트",
      nickName: null,
      userImg : null,
      social : null
    },
    {
      email: 'souvenir@test.com',
      password : process.env.TEMP,
      userName: "한슬",
      nickName: null,
      userImg : null,
      social : null
    },
    {
      email: 'sjkwan0922@test.com',
      password : process.env.TEMP,
      userName: "수진",
      nickName: null,
      userImg : null,
      social : null
    },
    {
      email: 'piecemakerz@test.com',
      password : process.env.TEMP,
      userName: "혁원",
      nickName: null,
      userImg : null,
      social : null
    },
    {
      email: 'lwd3737@test.com',
      password : process.env.TEMP,
      userName: "원동",
      nickName: null,
      userImg : null,
      social : null
    }], 
    {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
