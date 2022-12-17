'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('users', [
      {
        name: 'rio',
        profession: 'admin',
        role: 'admin',
        email: 'ryojuniyantara@gmail.com',
        password: await bcrypt.hash('123546', 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'balinux',
        profession: 'fullstack',
        role: 'student',
        email: 'balinux@gmail.com',
        password: await bcrypt.hash('123546', 10),
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('users', null, {});

  }
};
