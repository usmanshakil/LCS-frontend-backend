'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChildMedicalInfo = sequelize.define('child_medical_info', {
    doctor_name: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    doctor_phone: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    doctor_email: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    doctor_primary_language: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    doctor_insurance_carrier: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    doctor_insurance_number: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    last_physical_date: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    physical_reports: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    lead_screen_date: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    immunizations: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    allergies: {
      type: DataTypes.STRING,
      defaultValue: ''
    },



    has_allergy: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: true
    },
    date_of_doctor_letter: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: true,
    },
    medicine_expiration_date: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: true
    },



    eye_color: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    hair_color: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    gender: {
      type: DataTypes.ENUM('male', 'female'),
      defaultValue: 'male'
    },
    height: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    weight: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    race: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    identity_marks: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    add_child_to_directory: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    add_parent_to_directory: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    add_parent2_to_directory: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    has_signature_checked: {
      type: DataTypes.BOOLEAN,
      values: false
    }
  }, { underscored: true, timestamps: true });
  ChildMedicalInfo.associate = function (models) {
    // associations can be defined here
    ChildMedicalInfo.belongsTo(models.users, {
      // onDelete: 'CASCADE',
      hooks: true,
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    })
    ChildMedicalInfo.belongsTo(models.childs, {
      // onDelete: 'CASCADE',
      hooks: true,
      foreignKey: {
        name: 'child_id',
        allowNull: false
      }
    })
    ChildMedicalInfo.hasMany(models.medical_reports, {
      as: 'medical_reports'
    })
    // ChildMedicalInfo.belongsTo(models.classes, {
    //   // onDelete: 'CASCADE',
    //   hooks: true,
    //   foreignKey: {
    //     name: 'class_id',
    //     allowNull: true
    //   }
    // })
  };
  return ChildMedicalInfo;
};