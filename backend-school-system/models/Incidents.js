"use strict";
module.exports = (sequelize, DataTypes) => {
    const Incidents = sequelize.define(
        "incidents",
        {
            name: {
                type: DataTypes.STRING,
                defaultValue: "",
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false
            },
            incident_type: {
                type: DataTypes.STRING
            },
            description: {
                type: DataTypes.STRING
            },
            solution: {
                type: DataTypes.STRING
            },
            parent_notified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            teacher_signoff: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            director_signoff: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            status: {
                type: DataTypes.STRING
            },
            has_deleted: {
                type: DataTypes.ENUM("false", "true"),
                defaultValue: "false"
            },
        },
        {
            underscored: true,
            timestamps: false
        }
    );

    //Create instance method to use commonally
    Incidents.associate = function (models) {
        // associations can be defined here
        Incidents.belongsTo(models.classes, {
            onDelete:'CASCADE',
            hooks: true,
            foreignKey: {
                name: "class_id",
                allowNull: false
            }
        });
        Incidents.belongsTo(models.childs, {
            onDelete:'CASCADE',
            hooks: true,
            foreignKey: {
                name: "user_id",
                allowNull: false
            }
        });
        Incidents.belongsToMany(models.medias, { through: "incident_medias", timestamps: false }, );
        // Incidents.hasMany(models.medias, {as: 'photos'})
    };

    return Incidents;
};
