'use strict';
module.exports = (sequelize, DataTypes) => {
  const staff_emergency_detail = sequelize.define('staff_emergency_detail', {
    name: { type: DataTypes.STRING, defaultValue: '' },
    address: { type: DataTypes.STRING, defaultValue: '' },
    state: { type: DataTypes.STRING, defaultValue: '' },
    city: { type: DataTypes.STRING, defaultValue: '' },
    zip_code: { type: DataTypes.STRING, defaultValue: '' },
    home_phone: { type: DataTypes.STRING, defaultValue: '' },
    other_cell_phone: { type: DataTypes.STRING, defaultValue: '' },
    allergies: { type: DataTypes.STRING, defaultValue: '' },
    first_emergency_name: { type: DataTypes.STRING, defaultValue: '' },
    first_emergency_home_phone: { type: DataTypes.STRING, defaultValue: '' },
    first_emergency_phone: { type: DataTypes.STRING, defaultValue: '' },
    first_emergency_relationship_to_you: { type: DataTypes.STRING, defaultValue: '' },
    second_emergency_name: { type: DataTypes.STRING, defaultValue: '' },
    second_emergency_home_phone: { type: DataTypes.STRING, defaultValue: '' },
    second_emergency_phone: { type: DataTypes.STRING, defaultValue: '' },
    second_emergency_relationship_to_you: { type: DataTypes.STRING, defaultValue: '' },
    third_emergency_name: { type: DataTypes.STRING, defaultValue: '' },
    third_emergency_home_phone: { type: DataTypes.STRING, defaultValue: '' },
    third_emergency_phone: { type: DataTypes.STRING, defaultValue: '' },
    third_emergency_relationship_to_you: { type: DataTypes.STRING, defaultValue: '' },
    teacher_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
    staff_detail_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'staff_hiring_form_detail', key: 'staff_detail_id' } }
  }, { timestamps: true, underscored: true, freezeTableName: true });
  staff_emergency_detail.associate = function (models) {
    // associations can be defined here
    staff_emergency_detail.belongsTo(models.staff_hiring_form_detail, { foreignKey: 'staff_detail_id' })
  };
  return staff_emergency_detail;
};