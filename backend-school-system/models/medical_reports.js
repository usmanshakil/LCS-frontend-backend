'use strict';
module.exports = (sequelize, DataTypes) => {
  const medical_reports = sequelize.define('medical_reports', {
    child_medical_info_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'child_medical_info', key: 'id' } },
    physical_report: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, { timestamps: true, underscored: true });
  medical_reports.associate = function (models) {
    // associations can be defined here
  };
  return medical_reports;
};