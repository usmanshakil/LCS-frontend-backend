"use strict";
module.exports = (sequelize, DataTypes) => {
    const Locations = sequelize.define(
        "locations",
        {
            location: {
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


    Locations.associate = function (models) {
    }
    return Locations
};
