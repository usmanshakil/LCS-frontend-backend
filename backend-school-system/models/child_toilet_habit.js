'use strict';
module.exports = (sequelize, DataTypes) => {
  const child_toilet_habit = sequelize.define('child_toilet_habit', {
    has_diaper_used: {
      type: DataTypes.ENUM('', "yes", "no"),
      defaultValue: ''
    },
    has_diaper_rash_occur: {
      type: DataTypes.ENUM('', "yes", "no"),
      defaultValue: ''
    },
    has_parent_use_oil: {
      type: DataTypes.ENUM('', "yes", "no"),
      defaultValue: ''
    },
    has_parent_powder: {
      type: DataTypes.ENUM('', "yes", "no"),
      defaultValue: ''
    },
    has_parent_lotion: {
      type: DataTypes.ENUM('', "yes", "no"),
      defaultValue: ''
    },
    has_parent_use_other: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    has_bowel_movement_regular: {
      type: DataTypes.ENUM('', "yes", "no"),
      defaultValue: ''
    },
    how_many_time_bowl_move: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    has_problem_of_diarrhea: {
      type: DataTypes.ENUM('', "yes", "no"),
      defaultValue: ''
    },
    has_problem_of_constipation: {
      type: DataTypes.ENUM('', "yes", "no"),
      defaultValue: ''
    },
    has_toilet_training: {
      type: DataTypes.ENUM('', "yes", "no"),
      defaultValue: ''
    },
    particular_procedure_of_child: {
      type: DataTypes.STRING,
      allowNull: false
    },
    has_child_use_potty_chair: {
      type: DataTypes.ENUM('', "yes", "no"),
      defaultValue: ''
    },
    has_child_use_special_seat: {
      type: DataTypes.ENUM('', "yes", "no"),
      defaultValue: ''
    },
    has_child_use_regular_seat: {
      type: DataTypes.ENUM('', "yes", "no"),
      defaultValue: ''
    },
    how_child_indicate_bathroom: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    has_childwilling_to_use_bathroom: {
      type: DataTypes.ENUM('', "yes", "no"),
      defaultValue: ''
    },
    has_child_have_accident: {
      type: DataTypes.ENUM('', "yes", "no"),
      defaultValue: ''
    }
  }, { underscored: true, timestamps: true });
  child_toilet_habit.associate = function (models) {
    // associations can be defined here
    child_toilet_habit.belongsTo(models.users, {
      // onDelete:'CKASCADE',
      hooks: true,
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    })
    child_toilet_habit.belongsTo(models.childs, {
      // onDelete: 'CASCADE',
      hooks: true,
      foreignKey: {
        name: 'child_id',
        allowNull: false
      }
    });
  };
  return child_toilet_habit;
};