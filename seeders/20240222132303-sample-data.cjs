'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await queryInterface.bulkInsert('Users', [
      {
        firstName: "Danyal",
        lastName: "Arif",
        email: "danial.arif4170@gmail.com",
        password: "123456"
      }
     ], {returning: true})
     console.log(users)
    await queryInterface.bulkInsert('Tweets', [
      {
        userid: users[0].id,
        content: 'This is a random tweet.'
      },
      {
        userid: users[0].id,
        content: 'This is another random tweet.'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users')
  }
};
