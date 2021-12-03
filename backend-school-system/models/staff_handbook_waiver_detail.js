'use strict';
module.exports = (sequelize, DataTypes) => {
  const staff_handbook_waiver_detail = sequelize.define('staff_handbook_waiver_detail', {
    has_employee_agreed: { type: DataTypes.ENUM('false', 'true'), defaultValue: 'false' },
    has_teacher_signature: { type: DataTypes.ENUM('true', 'false'), defaulValue: 'true' },
    teacher_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
    staff_detail_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'staff_hiring_form_detail', key: 'staff_detail_id' } }
  }, { timestamps: true, underscored: true, freezeTableName: true });
  staff_handbook_waiver_detail.associate = function (models) {
    // associations can be defined here
    staff_handbook_waiver_detail.belongsTo(models.staff_hiring_form_detail, { foreignKey: 'staff_detail_id' })
  };
  return staff_handbook_waiver_detail;
};