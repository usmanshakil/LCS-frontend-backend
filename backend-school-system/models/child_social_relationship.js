'use strict';
module.exports = (sequelize, DataTypes) => {
  const child_social_relationship = sequelize.define('child_social_relationship', {
    child_description_by_parent: {
      type: DataTypes.STRING,
      allowNull:false
    },
    previous_experience: {
      type: DataTypes.STRING,
      allowNull:false
    },
    reaction_to_starnger: {
      type: DataTypes.ENUM('',"yes", "no"),
      defaultValue:""
    },
    favouraite_toy: {
      type: DataTypes.STRING,
      allowNull:false
    },
    child_fear: {
      type: DataTypes.STRING,
      allowNull:false
    },
    how_parent_comfort_child: {
      type: DataTypes.STRING,
      allowNull:false
    },
    behaviour_management: {
      type: DataTypes.STRING,
      allowNull:false
    },
    how_child_gain_experience: {
      type: DataTypes.STRING,
      allowNull:false
    },
    has_allow_play_alone: {
      type: DataTypes.ENUM('',"yes", "no"),
      defaultValue:""
    },
  }, { underscored: true, timestamps: true });
  child_social_relationship.associate = function(models) {
    // associations can be defined here
    child_social_relationship.belongsTo(models.users, {
      // onDelete:'CKASCADE',
      hooks: true,
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    })
    child_social_relationship.belongsTo(models.childs,{
      // onDelete: 'CASCADE',
      hooks: true,
      foreignKey: {
        name: 'child_id',
        allowNull: false
      }
    });
  };
  return child_social_relationship;
};