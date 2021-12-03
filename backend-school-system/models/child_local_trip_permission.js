'use strict';
module.exports = (sequelize, DataTypes) => {
  const child_local_trip_permission = sequelize.define('child_local_trip_permission', {
    has_parent_agreed_for_trip: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    has_parent_signature: {
      type: DataTypes.ENUM('true', 'false'),
      defaultValue: 'false'
    }
  }, { underscored: true, timestamps: true });
  child_local_trip_permission.associate = function (models) {
    // associations can be defined here
    child_local_trip_permission.belongsTo(models.users, {
      hooks: true,
      foreignKey: {
        name: "user_id",
        allowNull: false
      }
    })
    child_local_trip_permission.belongsTo(models.childs, {
      onDelete: 'CASCADE',
      hooks: true,
      foreignKey: {
        name: "child_id",
        allowNull: false
      }
    })
  };
  return child_local_trip_permission;
};