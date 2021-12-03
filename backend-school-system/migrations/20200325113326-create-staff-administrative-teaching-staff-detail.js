'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('staff_administrative_teaching_staff_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      infants: {
        type: Sequelize.ENUM
      },
      infants_toddlers: {
        type: Sequelize.ENUM
      },
      toddlers: {
        type: Sequelize.ENUM
      },
      toddlers_pre_school: {
        type: Sequelize.ENUM
      },
      pre_school: {
        type: Sequelize.ENUM
      },
      pre_school_sa: {
        type: Sequelize.ENUM
      },
      school_age: {
        type: Sequelize.ENUM
      },
      kindergarten_sa: {
        type: Sequelize.ENUM
      },
      multi_age_group: {
        type: Sequelize.ENUM
      },
      child_care_services_certificate: {
        type: Sequelize.STRING
      },
      list_any_licenses_certifications: {
        type: Sequelize.STRING
      },
      date_of_eec_professional_registry: {
        type: Sequelize.STRING
      },
      date_of_eec_educator_orientation: {
        type: Sequelize.STRING
      },
      signature: {
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
    return queryInterface.dropTable('staff_administrative_teaching_staff_details');
  }
};