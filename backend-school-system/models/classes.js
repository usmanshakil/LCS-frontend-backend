"use strict";
module.exports = (sequelize, DataTypes) => {
  const classes = sequelize.define(
    "classes",
    {
      class_name: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      class_age: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      room: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      location: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      has_deleted: {
        type: DataTypes.ENUM("false", "true"),
        defaultValue: "false",
      },
    },
    { underscored: true, timestamps: true }
  );
  classes.associate = function (models) {
    // associations can be defined here
    classes.hasMany(models.class_teachers, { as: "teachers" });
    classes.hasMany(models.childs, { as: "children" });
    // classes.hasMany(models.users, { as: "users" })
  };
  classes.sync({ force: false, alter: true }).then(() => {
    classes.findOne({ where: { class_name: "" } }).then((result) => {
      if (!result) {
        const defaultClass = {
          class_name: "",
          class_age: "",
          room: "",
          location: "",
        };
        classes.create(defaultClass);
      }
    });
  });
  return classes;
};
