"use strict";
// const roles = require('./role');
module.exports = (sequelize, DataTypes) => {
  const Medias = sequelize.define(
    "medias",
    {
        uuid: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            defaultValue: "",
        },
        extension: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false,
        },
    },
    {
      timestamps: false,
      underscored: true
    }
  );
  Medias.associate = function (models) {
  }
  return Medias;
};
