"use strict";
module.exports = (sequelize, DataTypes) => {
  const child_development_report = sequelize.define(
    "child_development_report",
    {
      age_began_sitting: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      crawling: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      walking: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      talking: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      has_child_pull_up: {
        type: DataTypes.ENUM('',"yes", "no"),
        defaultValue: ""
      },
      has_child_crawling: {
        type: DataTypes.ENUM('',"yes", "no"),
        defaultValue: ""
      },
      has_child_walk_with_support: {
        type: DataTypes.ENUM('',"yes", "no"),
        defaultValue: ""
      },
      has_speech_difficulties: {
        type: DataTypes.ENUM('',"yes", "no"),
        defaultValue: ""
      },
      special_words_to_describe: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      language_spoken_at_home: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      has_history_of_colics: {
        type: DataTypes.ENUM('',"yes", "no"),
        defaultValue: ""
      },
      has_child_use_pacifier_or_sucks_thumbs: {
        type: DataTypes.ENUM('',"yes", "no"),
        defaultValue: ""
      },
      when_child_use_pacifier_or_sucks_thumbs: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      has_child_have_fussy_time: {
        type: DataTypes.ENUM('',"yes", "no"),
        defaultValue: ""
      },
      when_child_have_fussy_time: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      how_parent_handle_time: {
        type: DataTypes.STRING,
        defaultValue: ""
      }
    },
    { underscored: true, timestamps: true }
  );
  child_development_report.associate = function(models) {
    child_development_report.belongsTo(models.users, {
      // onDelete:'CKASCADE',
      hooks: true,
      foreignKey: {
        name: "user_id",
        allowNull: false
      }
    });
    child_development_report.belongsTo(models.childs, {
      // onDelete: 'CASCADE',
      hooks: true,
      foreignKey: {
        name: "child_id",
        allowNull: false
      }
    });
    // associations can be defined here
  };
  return child_development_report;
};
