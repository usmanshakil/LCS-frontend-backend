'use strict';
module.exports = (sequelize, DataTypes) => {
  const staff_hiring_form_detail = sequelize.define('staff_hiring_form_detail', {
    staff_detail_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    program_name: { type: DataTypes.STRING, defaultValue: '' },
    name: { type: DataTypes.STRING, defaultValue: '' },
    date_of_birth: { type: DataTypes.STRING, defaultValue: '' },
    address: { type: DataTypes.STRING, defaultValue: '' },
    telephone_number: { type: DataTypes.STRING, defaultValue: '' },
    date_of_hire: { type: DataTypes.STRING, defaultValue: '' },
    social_security_number: { type: DataTypes.STRING, defaultValue: '' },
    current_position: { type: DataTypes.STRING, defaultValue: '' },
    supervisor_name: { type: DataTypes.STRING, defaultValue: '' },
    teacher_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } }
  }, { timestamps: true, underscored: true, freezeTableName: true });
  staff_hiring_form_detail.associate = function (models) {
    // associations can be defined here
    staff_hiring_form_detail.belongsTo(models.users, { foreignKey: { name: 'teacher_id' } })
    // staff_hiring_form_detail.hasMany(models.staff_administrative_teaching_staff_detail, { foreignKey: 'staff_detail_id' })
    staff_hiring_form_detail.hasMany(models.staff_education_detail, { foreignKey: 'staff_detail_id' })
    staff_hiring_form_detail.hasMany(models.staff_emergency_detail, { foreignKey: 'staff_detail_id' })
    staff_hiring_form_detail.hasMany(models.staff_handbook_waiver_detail, { foreignKey: 'staff_detail_id' })
    staff_hiring_form_detail.hasMany(models.staff_personal_reference_detail, { foreignKey: 'staff_detail_id' })
    staff_hiring_form_detail.hasMany(models.staff_professional_reference_detail, { foreignKey: 'staff_detail_id' })
    staff_hiring_form_detail.hasMany(models.staff_references_detail, { foreignKey: 'staff_detail_id' })
    staff_hiring_form_detail.hasMany(models.staff_statement_of_compliance_with_cori_detail, { foreignKey: 'staff_detail_id' })
  };
  return staff_hiring_form_detail;
};