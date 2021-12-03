'use strict';
module.exports = (sequelize, DataTypes) => {
  const child_photo_release = sequelize.define('child_photo_release', {
    has_photo_permission_granted: {
      type: DataTypes.ENUM('', "yes", "no"),
      defaultValue: ''
    },
    has_parent_signature: {
      type: DataTypes.ENUM('true', 'false'),
      defaultValue: 'false'
    }
  }, { underscored: true, timestamps: true });
  child_photo_release.associate = function (models) {
    // associations can be defined here
    child_photo_release.belongsTo(models.users, {
      hooks: true,
      foreignKey: {
        name: "user_id",
        allowNull: false
      }
    })
    child_photo_release.belongsTo(models.childs, {
      onDelete: 'CASCADE',
      hooks: true,
      foreignKey: {
        name: "child_id",
        allowNull: false
      }
    })
  };
  return child_photo_release;
};