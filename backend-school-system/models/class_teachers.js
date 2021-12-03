'use strict';
module.exports = (sequelize, DataTypes) => {
    const class_teachers = sequelize.define('class_teachers', {
    }, { underscored: true, timestamps: false });
    class_teachers.associate = function (models) {
        // associations can be defined here

        class_teachers.belongsTo(models.classes, {
            hooks: true,
            foreignKey: {
                name: "class_id",
                allowNull: false
            }
        })
        class_teachers.belongsTo(models.users, {
            hooks: true,
            foreignKey: {
                name: "teacher_id",
                allowNull: false
            }
        })
    };
    return class_teachers;
};