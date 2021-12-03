'use strict';
module.exports = (sequelize, DataTypes) => {
  const child_daily_schedule = sequelize.define('child_daily_schedule', {
    more_about_child: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, { underscored: true, timestamps: true });
  child_daily_schedule.associate = function(models) {
    // associations can be defined here
    child_daily_schedule.belongsTo(models.users, {
      // onDelete:'CKASCADE',
      hooks: true,
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    })
    child_daily_schedule.belongsTo(models.childs,{
      // onDelete: 'CASCADE',
      hooks: true,
      foreignKey: {
        name: 'child_id',
        allowNull: false
      }
    });
  };
  return child_daily_schedule;
};