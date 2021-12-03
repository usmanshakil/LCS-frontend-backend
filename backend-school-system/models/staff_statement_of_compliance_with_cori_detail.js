'use strict';
module.exports = (sequelize, DataTypes) => {
  const staff_statement_of_compliance_with_cori_detail = sequelize.define('staff_statement_of_compliance_with_cori_detail', {
    name_of_program: { type: DataTypes.STRING, defaultValue: '' },
    name_of_employee: { type: DataTypes.STRING, defaultValue: '' },
    signature: { type: DataTypes.STRING, defaultValue: '' },
    signature_of_licensee: { type: DataTypes.STRING, defaultValue: '' },
    teacher_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
    staff_detail_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'staff_hiring_form_detail', key: 'staff_detail_id' } }
  }, { timestamps: true, underscored: true, freezeTableName: true });
  staff_statement_of_compliance_with_cori_detail.associate = function (models) {
    // associations can be defined here
    staff_statement_of_compliance_with_cori_detail.belongsTo(models.staff_hiring_form_detail, { foreignKey: 'staff_detail_id' })
  };
  return staff_statement_of_compliance_with_cori_detail;
};