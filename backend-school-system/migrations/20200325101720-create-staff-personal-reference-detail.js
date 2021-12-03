'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('staff_personal_reference_details', {
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
      individual_relation_age: {
        type: Sequelize.STRING
      },
      comments_on_character: {
        type: Sequelize.STRING
      },
      weakness: {
        type: Sequelize.STRING
      },
      strength: {
        type: Sequelize.STRING
      },
      reliable: {
        type: Sequelize.STRING
      },
      patient: {
        type: Sequelize.STRING
      },
      compassionate: {
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
    return queryInterface.dropTable('staff_personal_reference_details');
  }
};