'use strict';
module.exports = (sequelize, DataTypes) => {
  const teacher_info = sequelize.define('teacher_info', {
    position: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    resume: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    interview_date: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    ref_1_email: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    ref_2_email: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    ref_1_phone: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    ref_2_phone: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    reference1: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    reference2: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    date_of_birth: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    date_of_hire: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    eec_cert_number: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    eec_pq_reg: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    eec_pq_reg_date: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    cori: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    cori_date: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    dcf: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    dcf_date: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    physical: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    physical_date: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    mmr1: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    mmr2: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    first_add: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    first_add_date: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    eecorient: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    medical_training: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    look_before_lock: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    sids: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    usda: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    prog_orientation: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    prog_orientation_date: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    staff_observe: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    staff_evaluation: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    staff_evaluation_date: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    dbus_lic: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    dbus_lic_date: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    program_name: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    completed_by: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    completed_date: DataTypes.STRING
  }, { underscored: true, timestamps: true });
  teacher_info.associate = function (models) {
    // associations can be defined here
    teacher_info.belongsTo(models.users, {
      hooks: true,
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    })
    // teacher_info.hasOne(models.teacher_training_detail, { foreignKey: 'user_id' })
  };
  return teacher_info;
};