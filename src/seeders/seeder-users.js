'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    return queryInterface.bulkInsert('Users', [
      {
        email: 'nqhuund@gmail.com',
        password: '123456', // ==> cần hash password để bảo mật hơn
        firstName: 'Quoc',
        lastName: 'Huu',
        address: 'VietNam',
        gender: 1,
        roleId: '',
        image: '',
        phonenumber: '0985385157',
        positionId: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

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
