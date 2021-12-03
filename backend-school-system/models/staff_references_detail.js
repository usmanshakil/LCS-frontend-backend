'use strict';
module.exports = (sequelize, DataTypes) => {
  const staff_references_detail = sequelize.define('staff_references_detail', {
    ref_name: { type: DataTypes.STRING, defaultValue: '' },
    ref_relationship: { type: DataTypes.STRING, defaultValue: '' },
    ref_address: { type: DataTypes.STRING, defaultValue: '' },
    ref_phone: { type: DataTypes.STRING, defaultValue: '' },
    ref_phone: { type: DataTypes.STRING, defaultValue: '' },
    teacher_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
    staff_detail_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'staff_hiring_form_detail', key: 'staff_detail_id' } }
  }, { timestamps: true, underscored: true, freezeTableName: true });
  staff_references_detail.associate = function (models) {
    // associations can be defined here
    staff_references_detail.belongsTo(models.staff_hiring_form_detail, { foreignKey: 'staff_detail_id' })
  };
  return staff_references_detail;
};