'use strict';
module.exports = (sequelize, DataTypes) => {
  const child_eating_habit = sequelize.define('child_eating_habit', {
    special_charecters_or_diffculties: {
      type:DataTypes.STRING,
      allowNull:false
    },
    special_formula_prepration_details: {
      type:DataTypes.STRING,
      allowNull:false
    },
    favouraite_food: {
      type:DataTypes.STRING,
      allowNull:false
    },
    food_refused: {
      type:DataTypes.STRING,
      allowNull:false
    },
    child_fedon_lap: {
      type:DataTypes.STRING,
      allowNull:false
    },
    high_chair: {
      type:DataTypes.STRING,
      allowNull:false
    },
    has_child_use_spoon: {
      type:DataTypes.ENUM('',"yes", "no"),
      defaultValue:''
    },
    has_child_use_fork: {
      type:DataTypes.ENUM('',"yes", "no"),
      defaultValue:''
    },
    has_child_use_hand: {
      type:DataTypes.ENUM('',"yes", "no"),
      defaultValue:''
    }
  }, {underscored:true,timestamps:true});
  child_eating_habit.associate = function(models) {
    // associations can be defined here
    child_eating_habit.belongsTo(models.users, {
      // onDelete:'CKASCADE',
      hooks: true,
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    })
    child_eating_habit.belongsTo(models.childs,{
      // onDelete: 'CASCADE',
      hooks: true,
      foreignKey: {
        name: 'child_id',
        allowNull: false
      }
    });
  };
  return child_eating_habit;
};