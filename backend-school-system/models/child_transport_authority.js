'use strict';
module.exports = (sequelize, DataTypes) => {
  const child_transport_authority = sequelize.define('child_transport_authority', {
    has_parent_drop_off: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    has_parent_pick_up: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    has_supervised_walk: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    has_public_private_van: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    has_program_bus_van: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    has_contract_van: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    has_private_transport_arranged_by_parent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    has_other: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    has_parent_signature: {
      type: DataTypes.ENUM('true', 'false'),
      defaultValue: 'false'
    }
  }, { underscored: true, timestamps: true });
  child_transport_authority.associate = function (models) {
    // associations can be defined here
    child_transport_authority.belongsTo(models.users, {
      hooks: true,
      foreignKey: {
        name: "user_id",
        allowNull: false
      }
    })
    child_transport_authority.belongsTo(models.childs, {
      // onDelete: 'CASCADE',
      hooks: true,
      foreignKey: {
        name: "child_id",
        allowNull: false
      }
    })
  };
  return child_transport_authority;
};