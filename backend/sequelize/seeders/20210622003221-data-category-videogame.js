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
    await queryInterface.bulkInsert('Category',[{
      nombre: 'FPS',
      status: 1,
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      nombre: 'RPG',
      status: 1,
      createdAt : new Date(),
      updatedAt : new Date()
    }]);

    await queryInterface.bulkInsert('Videogame',[{
      name: 'CS:GO',
      price: 0.0,
      idCategory: 1,
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      name: 'The legend of Zelda',
      price: 30,
      idCategory: 2,
      createdAt : new Date(),
      updatedAt : new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Videogame', null, {});
     await queryInterface.bulkDelete('Category', null, {});

  }
};
