'use strict';
module.exports = (sequelize, DataTypes) => {
  const staff_education_detail = sequelize.define('staff_education_detail', {
    position_applied_for: { type: DataTypes.STRING, defaultValue: '' },
    name: { type: DataTypes.STRING, defaultValue: '' },
    address: { type: DataTypes.STRING, defaultValue: '' },
    email_address: { type: DataTypes.STRING, defaultValue: '' },
    city: { type: DataTypes.STRING, defaultValue: '' },
    zip_code: { type: DataTypes.STRING, defaultValue: '' },
    ssn: { type: DataTypes.STRING, defaultValue: '' },
    high_school: { type: DataTypes.STRING, defaultValue: '' },
    collage_attended_degree: { type: DataTypes.STRING, defaultValue: '' },
    other_courses_workshops_attended: { type: DataTypes.STRING, defaultValue: '' },
    teacher_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
    staff_detail_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'staff_hiring_form_detail', key: 'staff_detail_id' } }
  }, { timestamps: true, underscored: true, freezeTableName: true });
  staff_education_detail.associate = function (models) {
    // associations can be defined here
    staff_education_detail.belongsTo(models.staff_hiring_form_detail, { foreignKey: 'staff_detail_id' })
  };
  return staff_education_detail;
};