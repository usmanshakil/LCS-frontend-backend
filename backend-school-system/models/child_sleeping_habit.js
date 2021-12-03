'use strict';
module.exports = (sequelize, DataTypes) => {
  const child_sleeping_habit = sequelize.define('child_sleeping_habit', {
    has_child_sleep_on_crib: {
      type:DataTypes.ENUM('',"yes", "no"),
      defaultValue:""
    },
    has_child_sleep_on_bed: {
      type:DataTypes.ENUM('',"yes", "no"),
      defaultValue:""
    },
    how_does_child_becometired: {
      type:DataTypes.STRING,
      allowNull:false
    },
    has_child_sleep_at_night: {
      type:DataTypes.ENUM('',"yes", "no"),
      defaultValue:""
    },
    has_child_get_up_in_morning: {
      type:DataTypes.ENUM('',"yes", "no"),
      defaultValue:""
    },
    special_charecterstic_or_need: {
      type:DataTypes.STRING,
      allowNull:false
    },
  }, { underscored: true, timestamps: true });
  child_sleeping_habit.associate = function(models) {
    // associations can be defined here
    child_sleeping_habit.belongsTo(models.users, {
      // onDelete:'CKASCADE',
      hooks: true,
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    })
    child_sleeping_habit.belongsTo(models.childs,{
      // onDelete: 'CASCADE',
      hooks: true,
      foreignKey: {
        name: 'child_id',
        allowNull: false
      }
    });
  };
  return child_sleeping_habit;
};