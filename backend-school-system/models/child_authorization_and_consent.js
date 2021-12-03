'use strict';
module.exports = (sequelize, DataTypes) => {
  const child_authorization_and_consent = sequelize.define('child_authorization_and_consent', {
    has_authorize_mychild: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    has_authorize_and_consent_agreement: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    has_parent_signature: {
      type: DataTypes.ENUM('true', 'false'),
      defaultValue: 'false'
    },
    // signature: {
    //   type: DataTypes.STRING,
    //   defaultValue: ''
    // }
  }, { underscored: true, timestamps: true });
  child_authorization_and_consent.associate = function (models) {
    // associations can be defined here
    child_authorization_and_consent.belongsTo(models.users, {
      hooks: true,
      foreignKey: {
        name: "user_id",
        allowNull: false
      }
    })
    child_authorization_and_consent.belongsTo(models.childs, {
      // onDelete: 'CASCADE',
      hooks: true,
      foreignKey: {
        name: "child_id",
        allowNull: false
      }
    })
  };
  return child_authorization_and_consent;
};