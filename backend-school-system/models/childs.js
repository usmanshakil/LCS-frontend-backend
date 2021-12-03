"use strict";
module.exports = (sequelize, DataTypes) => {
  const Childs = sequelize.define(
    "childs",
    {
      first_name: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      last_name: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      birth_date: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      birth_place: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      admission_date: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      expiry_date: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      // month_age_of_admission:{
      //   type:DataTypes.STRING,
      //   defaultValue:''
      // },
      address: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      city: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      state: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      zip_code: {
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
  Childs.associate = function (models) {
    // associations can be defined here
    Childs.belongsTo(models.users, {
      // onDelete: 'CASCADE',
      hooks: true,
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });
    Childs.belongsTo(models.classes, {
      // onDelete: 'CASCADE',
      hooks: true,
      foreignKey: {
        name: "class_id",
        allowNull: true,
      },
    });
    // Childs.hasOne(models.medical_reports, { as: "reports" })
    Childs.hasMany(models.child_parent_info, { as: "parentInfo" });
    Childs.hasMany(models.child_medical_info, { as: "medicalInfo" });
    Childs.hasMany(models.child_emergency_contact_info, {
      as: "emergencyInfo",
    });
    Childs.hasMany(models.child_development_report, { as: "devReport" });
    Childs.hasMany(models.child_health_report, { as: "healthReport" });
    Childs.hasMany(models.child_eating_habit, { as: "eatingHabitReport" });
    Childs.hasMany(models.child_toilet_habit, { as: "toiletHabitReport" });
    Childs.hasMany(models.child_sleeping_habit, { as: "sleepingHabitReport" });
    Childs.hasMany(models.child_social_relationship, {
      as: "socialRelationshipReport",
    });
    Childs.hasMany(models.child_daily_schedule, { as: "dailyScheduleReport" });
    Childs.hasMany(models.child_photo_release, { as: "photoRelease" });
    Childs.hasMany(models.child_local_trip_permission, {
      as: "localTripPermission",
    });
    Childs.hasMany(models.child_parent_agreement, { as: "parentAgreement" });
    Childs.hasMany(models.child_authorization_and_consent, {
      as: "authorizationAndConsent",
    });
    Childs.hasMany(models.child_sunscreen_permissions, {
      as: "sunscreenPermission",
    });
    Childs.hasMany(models.child_toothbrushing_info, {
      as: "toothBrushingInformation",
    });
    Childs.hasMany(models.child_transport_authority, {
      as: "transportAuthority",
    });
    Childs.hasMany(models.child_school_directory_info, {
      as: "schoolDirectory",
    });
  };
  return Childs;
};
