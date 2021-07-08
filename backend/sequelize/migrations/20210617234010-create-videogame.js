'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Videogame', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DOUBLE
      },
      idCategory: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('Videogame',{
      type : 'FOREIGN KEY',
      fields : ['idCategory'],
      name : 'FK_Videogame_Category',
      references : {
        table : 'Category',
        field : 'id'
      }
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Videogame', 'FK_Videogame_Category');
    await queryInterface.dropTable('Videogame');
  }
};