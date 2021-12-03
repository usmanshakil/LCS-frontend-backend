'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChildParentInfo = sequelize.define('child_parent_info', {
    parent_type: {
      type: DataTypes.ENUM,
      values: ['parent1', 'parent2']
    },
    first_name: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    last_name: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    phone1: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    phone2: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    email1: {
      type: DataTypes.STRING,
      defaultValue: ''
    },

    // email2: {
    //   type:DataTypes.STRING,
    //   defaultValue:''
    // },
    address: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    city: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    state: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    zip_code: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    business_name: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    business_address: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    work_start_time: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    work_end_time: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    business_phone: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
  }, { underscored: true, timestamps: true });
  ChildParentInfo.associate = function (models) {
    // associations can be defined here
    ChildParentInfo.belongsTo(models.users, {
      // onDelete:'CKASCADE',
      hooks: true,
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    })
    ChildParentInfo.belongsTo(models.childs, {
      // onDelete:"CASCADE",
      hooks: true,
      foreignKey: {
        name: 'child_id',
        allowNull: false
      }
    })
  };
  return ChildParentInfo;
};