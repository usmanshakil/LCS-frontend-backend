'use strict';
module.exports = (sequelize, DataTypes) => {
  const staff_professional_reference_detail = sequelize.define('staff_professional_reference_detail', {
    reference_name: { type: DataTypes.STRING, defaultValue: '' },
    title_relationship: { type: DataTypes.STRING, defaultValue: '' },
    employee_experiece_organization: { type: DataTypes.STRING, defaultValue: '' },
    punctuality: { type: DataTypes.STRING, defaultValue: '' },
    attendance: { type: DataTypes.STRING, defaultValue: '' },
    coworkers: { type: DataTypes.STRING, defaultValue: '' },
    supervisors: { type: DataTypes.STRING, defaultValue: '' },
    parents: { type: DataTypes.STRING, defaultValue: '' },
    children: { type: DataTypes.STRING, defaultValue: '' },
    will_employee_hired_again: { type: DataTypes.STRING, defaultValue: '' },
    teacher_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
    staff_detail_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'staff_hiring_form_detail', key: 'staff_detail_id' } }
  }, { timestamps: true, underscored: true, freezeTableName: true });
  staff_professional_reference_detail.associate = function (models) {
    // associations can be defined here
    staff_professional_reference_detail.belongsTo(models.staff_hiring_form_detail, { foreignKey: 'staff_detail_id' })
  };
  return staff_professional_reference_detail;
};