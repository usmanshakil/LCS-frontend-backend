'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('staff_references_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ref_name: {
        type: Sequelize.STRING
      },
      ref_relationship: {
        type: Sequelize.STRING
      },
      ref_address: {
        type: Sequelize.STRING
      },
      ref_phone: {
        type: Sequelize.STRING
      },
      ref_phone: {
        type: Sequelize.STRING
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
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('staff_references_details');
  }
};