"use strict";
module.exports = (sequelize, DataTypes) => {
    const Incident_type = sequelize.define(
        "incident_type",
        {
            incident_type: {
                type: DataTypes.STRING,
                defaultValue: "",
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: "",
                allowNull: false,
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


    Incident_type.associate = function (models) {
    }
    return Incident_type
};
