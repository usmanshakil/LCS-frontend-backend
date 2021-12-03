'use strict';
// const roles = require('./role');
module.exports = (sequelize, DataTypes) => {
  const UsersRole = sequelize.define('users_role', {
    user_id:DataTypes.INTEGER,
    role_id:DataTypes.INTEGER,
    // created_at: DataTypes.DATE,
    // updated_at:DataTypes.DATE
    // user_id: DataTypes.INTEGER
  }, { underscored: true, timestamps:true});
  UsersRole.associate = function(models) {
    // associations can be defined here
    UsersRole.belongsTo(models.users,{
      // onDelete:'CASCADE',
      hooks:true,
      foreignKey:{
        name:'user_id',
        allowNull:false
      }
    })
    UsersRole.belongsTo(models.role,{
      // onDelete:'CASCADE',
      hooks:true,
      foreignKey:{
        name:'role_id',
        allowNull:false
      }
    })
  };
  return UsersRole;
};