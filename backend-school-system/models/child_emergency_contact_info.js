'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChildEmergencyContactInfo = sequelize.define('child_emergency_contact_info', {
    type: {
      type:DataTypes.ENUM,
      values:['emergency1','emergency2'],
      allowNull:false
    },
    first_name: {
      type:DataTypes.STRING,
      defaultValue:''
    },
    last_name: {
      type:DataTypes.STRING,
      defaultValue:''
    },
    phone1: {
      type:DataTypes.STRING,
      defaultValue:''
    },
    phone2: {
      type:DataTypes.STRING,
      defaultValue:''
    },
    email1: {
      type:DataTypes.STRING,
      defaultValue:''
    },
    // email2: {
    //   type:DataTypes.STRING,
    //   defaultValue:''
    // },
    address: {
      type:DataTypes.STRING,
      defaultValue:''
    },
    city: {
      type:DataTypes.STRING,
      defaultValue:''
    },
    state: {
      type:DataTypes.STRING,
      defaultValue:''
    },
    zip_code: {
      type:DataTypes.STRING,
      defaultValue:''
    },
    relationship: {
      type:DataTypes.STRING,
      defaultValue:''
    },
    has_emergency_release: {
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },
    
  }, { underscored: true, timestamps: true });
  ChildEmergencyContactInfo.associate = function(models) {
    // associations can be defined here
    ChildEmergencyContactInfo.belongsTo(models.users,{
      // onDelete: 'CASCADE',
      hooks: true,
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    })
    ChildEmergencyContactInfo.belongsTo(models.childs,{
      // onDelete:'CASCADE',
      hooks: true,
      foreignKey: {
        name: 'child_id',
        allowNull: false
      }
    })
  };
  return ChildEmergencyContactInfo;
};