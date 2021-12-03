'use strict';
module.exports = (sequelize, DataTypes) => {
  const child_health_report = sequelize.define('child_health_report', {
    has_complication_at_birth: {
      type:DataTypes.ENUM('',"yes", "no"),
      defaultValue:""
    },
    serious_illness_hospitalization:{
      type:DataTypes.STRING,
      allowNull:false
    },
    special_physical_condition:{
      type:DataTypes.STRING,
      allowNull:false
    },
    allergies:{ 
      type:DataTypes.STRING,
      allowNull:false
    },
    regular_medications:{
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {underscored:true,timestamps:true});
  child_health_report.associate = function(models) {
    // associations can be defined here
    child_health_report.belongsTo(models.users, {
      // onDelete:'CKASCADE',
      hooks: true,
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    })
    child_health_report.belongsTo(models.childs,{
      // onDelete: 'CASCADE',
      hooks: true,
      foreignKey: {
        name: 'child_id',
        allowNull: false
      }
    });
  };
  return child_health_report;
};