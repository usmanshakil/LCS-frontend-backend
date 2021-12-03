'use strict';
module.exports = (sequelize, DataTypes) => {
  const announcements = sequelize.define('announcements', {
    title: {
      type:DataTypes.STRING,
      defaultValue:''
    },
    description: {
      type:DataTypes.STRING,
      defaultValue:''
    },
    status: {
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },
    has_deleted: {
      type:DataTypes.ENUM('false','true'),
      defaultValue:'false'
    }
  }, { underscored: true, timestamps: true });
  announcements.associate = function(models) {
    // associations can be defined here
  };
  return announcements;
};