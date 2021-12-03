'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('staff_statement_of_compliance_with_cori_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_of_program: {
        type: Sequelize.STRING
      },
      name_of_employee: {
        type: Sequelize.STRING
      },
      signature: {
        type: Sequelize.STRING
      },
      signature_of_licensee: {
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
    return queryInterface.dropTable('staff_statement_of_compliance_with_cori_details');
  }
};