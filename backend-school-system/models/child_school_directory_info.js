'use strict';
module.exports = (sequelize, DataTypes) => {
  const child_school_directory_info = sequelize.define('child_school_directory_info', {
    has_parent_information_publish: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    has_parent_wish_to_add_school_directory: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    has_parent_signature: {
      type: DataTypes.ENUM('true', 'false'),
      defaultValue: 'false'
    }
  }, { underscored: true, timestamps: true });
  child_school_directory_info.associate = function (models) {
    // associations can be defined here
    child_school_directory_info.belongsTo(models.users, {
      hooks: true,
      foreignKey: {
        name: "user_id",
        allowNull: false
      }
    })
    child_school_directory_info.belongsTo(models.childs, {
      // onDelete: 'CASCADE',
      hooks: true,
      foreignKey: {
        name: "child_id",
        allowNull: false
      }
    })
  };
  return child_school_directory_info;
};