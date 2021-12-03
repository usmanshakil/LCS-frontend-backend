'use strict';
module.exports = (sequelize, DataTypes) => {
  const teacher_training_detail = sequelize.define('teacher_training_detail', {
    training_detail_id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    child_abuse_neglect: { type: DataTypes.ENUM('', 'yes', 'no'), defaultValue: 'no' },
    child_abuse_neglect_date: { type: DataTypes.STRING, defaultValue: '' },
    emergency_response_planning: { type: DataTypes.ENUM('', 'yes', 'no'), defaultValue: 'no' },
    emergency_response_planning_date: { type: DataTypes.STRING, defaultValue: '' },
    first_aid_cpr_overview: { type: DataTypes.ENUM('', 'yes', 'no'), defaultValue: 'no' },
    first_aid_cpr_overview_date: { type: DataTypes.STRING, defaultValue: '' },
    food_related_risk_response: { type: DataTypes.ENUM('', 'yes', 'no'), defaultValue: 'no' },
    food_related_risk_response_date: { type: DataTypes.STRING, defaultValue: '' },
    hazardous_materials: { type: DataTypes.ENUM('', 'yes', 'no'), defaultValue: 'no' },
    hazardous_materials_date: { type: DataTypes.STRING, defaultValue: '' },
    infant_safe_sleeping_practices: { type: DataTypes.ENUM('', 'yes', 'no'), defaultValue: 'no' },
    infant_safe_sleeping_practices_date: { type: DataTypes.STRING, defaultValue: '' },
    infectious_diseases_immunizations: { type: DataTypes.ENUM('', 'yes', 'no'), defaultValue: 'no' },
    infectious_diseases_immunizations_date: { type: DataTypes.STRING, defaultValue: '' },
    introduction_child_development: { type: DataTypes.ENUM('', 'yes', 'no'), defaultValue: 'no' },
    introduction_child_development_date: { type: DataTypes.STRING, defaultValue: '' },
    medication_administration: { type: DataTypes.ENUM('', 'yes', 'no'), defaultValue: 'no' },
    medication_administration_date: { type: DataTypes.STRING, defaultValue: '' },
    physical_premises_safety: { type: DataTypes.ENUM('', 'yes', 'no'), defaultValue: 'no' },
    physical_premises_safety_date: { type: DataTypes.STRING, defaultValue: '' },
    shaken_baby_syndrome: { type: DataTypes.ENUM('', 'yes', 'no'), defaultValue: 'no' },
    shaken_baby_syndrome_date: { type: DataTypes.STRING, defaultValue: '' },
    transporting_children: { type: DataTypes.ENUM('', 'yes', 'no'), defaultValue: 'no' },
    transporting_children_date: { type: DataTypes.STRING, defaultValue: '' },
    total_hours: { type: DataTypes.STRING, defaultValue: '' },
    total_hours_date: { type: DataTypes.STRING, defaultValue: '' },
    eec_yearly_renewal: { type: DataTypes.ENUM('', 'yes', 'no'), defaultValue: 'no' },
    eec_yearly_renewal_date: { type: DataTypes.STRING, defaultValue: '' },
    eec_child_abuse_neglect: { type: DataTypes.ENUM('', 'yes', 'no'), defaultValue: 'no' },
    eec_child_abuse_neglect_date: { type: DataTypes.STRING, defaultValue: '' },
    eec_emergency_response_planning: { type: DataTypes.ENUM('', 'yes', 'no'), defaultValue: 'no' },
    eec_emergency_response_planning_date: { type: DataTypes.STRING, defaultValue: '' },
    eec_food_related_risk_response: { type: DataTypes.ENUM('', 'yes', 'no'), defaultValue: 'no' },
    eec_food_related_risk_response_date: { type: DataTypes.STRING, defaultValue: '' },
    eec_infectious_diseases_immunizations: { type: DataTypes.ENUM('', 'yes', 'no'), defaultValue: 'no' },
    eec_infectious_diseases_immunizations_date: { type: DataTypes.STRING, defaultValue: '' },
    eec_medication_administration: { type: DataTypes.ENUM('', 'yes', 'no'), defaultValue: 'no' },
    eec_medication_administration_date: { type: DataTypes.STRING, defaultValue: '' },
    eec_transporting_children: { type: DataTypes.ENUM('', 'yes', 'no'), defaultValue: 'no' },
    eec_transporting_children_date: { type: DataTypes.STRING, defaultValue: '' },
    eec_infant_safe_sleeping_practices: { type: DataTypes.ENUM('', 'yes', 'no'), defaultValue: 'no' },
    eec_infant_safe_sleeping_practices_date: { type: DataTypes.STRING, defaultValue: '' },
    eec_shaken_baby_syndrome: { type: DataTypes.ENUM('', 'yes', 'no'), defaultValue: 'no' },
    eec_shaken_baby_syndrome_date: { type: DataTypes.STRING, defaultValue: '' },
    teacher_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } }
  }, { timestamps: true, underscored: true });
  teacher_training_detail.associate = function (models) {
    // associations can be defined here
    teacher_training_detail.belongsTo(models.users, { foreignKey: 'teacher_id' })
  };
  return teacher_training_detail;
};