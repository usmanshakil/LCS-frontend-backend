'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('staff_professional_reference_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reference_name: {
        type: Sequelize.STRING
      },
      title_relationship: {
        type: Sequelize.STRING
      },
      employee_experiece_organization: {
        type: Sequelize.STRING
      },
      punctuality: {
        type: Sequelize.STRING
      },
      attendance: {
        type: Sequelize.STRING
      },
      coworkers: {
        type: Sequelize.STRING
      },
      supervisors: {
        type: Sequelize.STRING
      },
      parents: {
        type: Sequelize.STRING
      },
      children: {
        type: Sequelize.STRING
      },
      will_employee_hired_again: {
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
    return queryInterface.dropTable('staff_professional_reference_details');
  }
};