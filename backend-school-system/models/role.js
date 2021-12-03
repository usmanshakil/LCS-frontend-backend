"use strict";
// const roles = require('./role');
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "role",
    {
      role: DataTypes.STRING,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      timestamps: false,
      underscored: true
    }
  );
  Role.associate = function (models) {
    Role.hasOne(models.users, { foreignKey: 'role_id' })
  }
  // Users.associate = function(models) {
  //   Users.belongsTo(models.roles)
  //   // associations can be defined here
  // };
  Role.sync({ force: false, alter: true }).then(() => {
    Role.findAll().then(result => {
      if (!result || result.length < 1) {
        const defaultRole = [{ role: 'Super_Admin' }, { role: 'Admin' }, { role: 'Parent' }, { role: 'Teacher' }]
        Role.bulkCreate(defaultRole)
      }
    })

  })
  return Role;
};
