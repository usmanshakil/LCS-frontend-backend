'use strict';
module.exports = (sequelize, DataTypes) => {
  const child_toothbrushing_info = sequelize.define('child_toothbrushing_info', {
    has_participate_in_toothbrushing: {
      type: DataTypes.ENUM('', 'yes', 'no'),
      defaultValue: ''
    },
    has_fluoride: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    has_school_toothbrushing: {
      type: DataTypes.ENUM('', 'yes', 'no'),
      defaultValue: ''
    },
    has_parent_signature: {
      type: DataTypes.ENUM('true', 'false'),
      defaultValue: 'false'
    }
  }, { underscored: true, timestamps: true });
  child_toothbrushing_info.associate = function (models) {
    // associations can be defined here
    child_toothbrushing_info.belongsTo(models.users, {
      hooks: true,
      foreignKey: {
        name: "user_id",
        allowNull: false
      }
    })
    child_toothbrushing_info.belongsTo(models.childs, {
      // onDelete: 'CASCADE',
      hooks: true,
      foreignKey: {
        name: "child_id",
        allowNull: false
      }
    })
  };
  return child_toothbrushing_info;
};