'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('staff_emergency_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      zip_code: {
        type: Sequelize.STRING
      },
      home_phone: {
        type: Sequelize.STRING
      },
      allergies: {
        type: Sequelize.STRING
      },
      first_emergency_name: {
        type: Sequelize.STRING
      },
      first_emergency_home_phone: {
        type: Sequelize.STRING
      },
      first_emergency_phone: {
        type: Sequelize.STRING
      },
      first_emergency_relationship_to_you: {
        type: Sequelize.STRING
      },
      second_emergency_name: {
        type: Sequelize.STRING
      },
      second_emergency_home_phone: {
        type: Sequelize.STRING
      },
      second_emergency_phone: {
        type: Sequelize.STRING
      },
      second_emergency_relationship_to_you: {
        type: Sequelize.STRING
      },
      third_emergency_name: {
        type: Sequelize.STRING
      },
      third_emergency_home_phone: {
        type: Sequelize.STRING
      },
      third_emergency_phone: {
        type: Sequelize.STRING
      },
      third_emergency_relationship_to_you: {
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
    return queryInterface.dropTable('staff_emergency_details');
  }
};