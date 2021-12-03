'use strict';
module.exports = (sequelize, DataTypes) => {
  const child_parent_agreement = sequelize.define('child_parent_agreement', {
    has_parent_agreed_with_policies: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    has_parent_signature: {
      type: DataTypes.ENUM('true', 'false'),
      defaultValue: 'false'
    }
  }, { underscored: true, timestamps: true });
  child_parent_agreement.associate = function (models) {
    // associations can be defined here
    child_parent_agreement.belongsTo(models.users, {
      hooks: true,
      foreignKey: {
        name: "user_id",
        allowNull: false
      }
    })
    child_parent_agreement.belongsTo(models.childs, {
      onDelete: 'CASCADE',
      hooks: true,
      foreignKey: {
        name: "child_id",
        allowNull: false
      }
    })
  };
  return child_parent_agreement;
};