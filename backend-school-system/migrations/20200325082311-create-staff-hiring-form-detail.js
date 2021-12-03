'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('staff_hiring_form_details', {
      staff_detail_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      program_name: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      date_of_birth: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      telephone_number: {
        type: Sequelize.STRING
      },
      date_of_hire: {
        type: Sequelize.STRING
      },
      social_security_number: {
        type: Sequelize.STRING
      },
      current_position: {
        type: Sequelize.STRING
      },
      supervisor_name: {
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
    return queryInterface.dropTable('staff_hiring_form_details');
  }
};