'use strict';
module.exports = (sequelize, DataTypes) => {
  const staff_personal_reference_detail = sequelize.define('staff_personal_reference_detail', {
    reference_name: { type: DataTypes.STRING, defaultValue: '' },
    title_relationship: { type: DataTypes.STRING, defaultValue: '' },
    individual_relation_age: { type: DataTypes.STRING, defaultValue: '' },
    comments_on_character: { type: DataTypes.STRING, defaultValue: '' },
    weakness: { type: DataTypes.STRING, defaultValue: '' },
    strength: { type: DataTypes.STRING, defaultValue: '' },
    reliable: { type: DataTypes.ENUM('', 'yes', 'no'), defaultValue: '' },
    patient: { type: DataTypes.ENUM('', 'yes', 'no'), defaultValue: '' },
    compassionate: { type: DataTypes.ENUM('', 'yes', 'no'), defaultValue: '' },
    teacher_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
    staff_detail_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'staff_hiring_form_detail', key: 'staff_detail_id' } }
  }, { timestamps: true, underscored: true, freezeTableName: true });
  staff_personal_reference_detail.associate = function (models) {
    // associations can be defined here
    staff_personal_reference_detail.belongsTo(models.staff_hiring_form_detail, { foreignKey: 'staff_detail_id' })
  };
  return staff_personal_reference_detail;
};