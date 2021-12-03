'use strict';
module.exports = (sequelize, DataTypes) => {
  const child_sunscreen_permissions = sequelize.define('child_sunscreen_permissions', {
    has_sunscreen_provided_by_school: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    has_child_bring_sunscreen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    has_parent_signature: {
      type: DataTypes.ENUM('true', 'false'),
      defaultValue: 'false'
    }
  }, { underscored: true, timestamps: true });
  child_sunscreen_permissions.associate = function (models) {
    // associations can be defined here
    child_sunscreen_permissions.belongsTo(models.users, {
      hooks: true,
      foreignKey: {
        name: "user_id",
        allowNull: false
      }
    })
    child_sunscreen_permissions.belongsTo(models.childs, {
      // onDelete: 'CASCADE',
      hooks: true,
      foreignKey: {
        name: "child_id",
        allowNull: false
      }
    })
  };
  return child_sunscreen_permissions;
};