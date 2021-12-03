'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('teacher_infos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      position: {
        type: Sequelize.STRING
      },
      resume: {
        type: Sequelize.STRING
      },
      interview_date: {
        type: Sequelize.STRING
      },
      ref_1_email: {
        type: Sequelize.STRING
      },
      ref_2_email: {
        type: Sequelize.STRING
      },
      ref_1_phone: {
        type: Sequelize.STRING
      },
      ref_2_phone: {
        type: Sequelize.STRING
      },
      reference1: {
        type: Sequelize.STRING
      },
      reference2: {
        type: Sequelize.STRING
      },
      date_of_birth: {
        type: Sequelize.STRING
      },
      date_of_hire: {
        type: Sequelize.STRING
      },
      eec_cert_number: {
        type: Sequelize.STRING
      },
      eec_pq_reg: {
        type: Sequelize.STRING
      },
      eec_pq_reg_date: {
        type: Sequelize.STRING
      },
      cori: {
        type: Sequelize.STRING
      },
      cori_date: {
        type: Sequelize.STRING
      },
      dcf: {
        type: Sequelize.STRING
      },
      dcf_date: {
        type: Sequelize.STRING
      },
      physical: {
        type: Sequelize.STRING
      },
      physical_date: {
        type: Sequelize.STRING
      },
      mmr1: {
        type: Sequelize.STRING
      },
      mmr2: {
        type: Sequelize.STRING
      },
      first_add: {
        type: Sequelize.STRING
      },
      first_add_date: {
        type: Sequelize.STRING
      },
      eecorient: {
        type: Sequelize.STRING
      },
      medical_training: {
        type: Sequelize.STRING
      },
      look_before_lock: {
        type: Sequelize.STRING
      },
      sids: {
        type: Sequelize.STRING
      },
      usda: {
        type: Sequelize.STRING
      },
      prog_orientation: {
        type: Sequelize.STRING
      },
      prog_orientation_date: {
        type: Sequelize.STRING
      },
      staff_observe: {
        type: Sequelize.STRING
      },
      staff_evaluation: {
        type: Sequelize.STRING
      },
      staff_evaluation_date: {
        type: Sequelize.STRING
      },
      7 _dbus_lic: {
        type: Sequelize.STRING
      },
      7 _dbus_lic_date: {
        type: Sequelize.STRING
      },
      program_name: {
        type: Sequelize.STRING
      },
      completed_by: {
        type: Sequelize.STRING
      },
      completed_date: {
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
    return queryInterface.dropTable('teacher_infos');
  }
};