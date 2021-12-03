'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('teacher_training_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      child_abuse_neglect: {
        type: Sequelize.ENUM
      },
      child_abuse_neglect_date: {
        type: Sequelize.STRING
      },
      emergency_response_planning: {
        type: Sequelize.ENUM
      },
      emergency_response_planning_date: {
        type: Sequelize.STRING
      },
      first_aid_cpr_overview: {
        type: Sequelize.ENUM
      },
      first_aid_cpr_overview_date: {
        type: Sequelize.STRING
      },
      food_related_risk_response: {
        type: Sequelize.ENUM
      },
      food_related_risk_response_date: {
        type: Sequelize.STRING
      },
      hazardous_materials: {
        type: Sequelize.ENUM
      },
      hazardous_materials_date: {
        type: Sequelize.STRING
      },
      infant_safe_sleeping_practices: {
        type: Sequelize.ENUM
      },
      infant_safe_sleeping_practices_date: {
        type: Sequelize.STRING
      },
      infectious_diseases_immunizations: {
        type: Sequelize.ENUM
      },
      infectious_diseases_immunizations_date: {
        type: Sequelize.STRING
      },
      introduction_child_development: {
        type: Sequelize.ENUM
      },
      introduction_child_development_date: {
        type: Sequelize.STRING
      },
      medication_administration: {
        type: Sequelize.ENUM
      },
      medication_administration_date: {
        type: Sequelize.STRING
      },
      physical_premises_safety: {
        type: Sequelize.ENUM
      },
      physical_premises_safety_date: {
        type: Sequelize.STRING
      },
      shaken_baby_syndrome: {
        type: Sequelize.ENUM
      },
      shaken_baby_syndrome_date: {
        type: Sequelize.STRING
      },
      transporting_children: {
        type: Sequelize.ENUM
      },
      transporting_children_date: {
        type: Sequelize.STRING
      },
      total_hours: {
        type: Sequelize.STRING
      },
      total_hours_date: {
        type: Sequelize.STRING
      },
      eec_yearly_renewal: {
        type: Sequelize.ENUM
      },
      eec_yearly_renewal_dateL: {
        type: Sequelize.STRING
      },
      eec_child_abuse_neglect: {
        type: Sequelize.ENUM
      },
      eec_child_abuse_neglect_date: {
        type: Sequelize.STRING
      },
      eec_emergency_response_planning: {
        type: Sequelize.ENUM
      },
      eec_emergency_response_planning_date: {
        type: Sequelize.STRING
      },
      eec_food_related_risk_response: {
        type: Sequelize.ENUM
      },
      eec_food_related_risk_response_date: {
        type: Sequelize.STRING
      },
      eec_infectious_diseases_immunizations: {
        type: Sequelize.ENUM
      },
      eec_infectious_diseases_immunizations_date: {
        type: Sequelize.STRING
      },
      eec_medication_administration: {
        type: Sequelize.ENUM
      },
      eec_medication_administration_date: {
        type: Sequelize.STRING
      },
      eec_transporting_children: {
        type: Sequelize.ENUM
      },
      eec_transporting_children_date: {
        type: Sequelize.STRING
      },
      eec_infant_safe_sleeping_practices: {
        type: Sequelize.ENUM
      },
      eec_infant_safe_sleeping_practices_date: {
        type: Sequelize.STRING
      },
      eec_shaken_baby_syndrome: {
        type: Sequelize.ENUM
      },
      eec_shaken_baby_syndrome_date: {
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
    return queryInterface.dropTable('teacher_training_details');
  }
};