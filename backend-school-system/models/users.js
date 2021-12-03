"use strict";
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      first_name: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      last_name: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING
      },
      method: {
        type: DataTypes.STRING
      },
      social_id: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      cellphone: {
        type: DataTypes.STRING
      },
      approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
      },
      email_confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
      },
      signature: {
        type: DataTypes.TEXT,
        defaultValue: ""
      },
      comment: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      last_login: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      initial_role_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      reset_password_token: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      has_received_text: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
      },
      has_deleted: {
        type: DataTypes.ENUM("false", "true"),
        defaultValue: "false"
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at"
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at"
      }
    },
    {
      hooks: {
        beforeCreate: user => {
          if (user.password) {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
        beforeBulkUpdate: user => {
          if (user.attributes.password) {
            const salt = bcrypt.genSaltSync();
            user.attributes.password = bcrypt.hashSync(
              user.attributes.password,
              salt
            );
          }
        }
      },
      underscored: true,
      timestamps: true
    }
  );

  //Create instance method to use commonally
  Users.prototype.validatepassword = function (password, hashPassword) {
    if (hashPassword) {
      return bcrypt.compareSync(password, hashPassword);
    }
  };
  Users.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());

    delete values.method;
    delete values.social_id;
    delete values.password;
    return values;
  };
  Users.associate = function (models) {
    // associations can be defined here
    Users.belongsTo(models.role, {
      // onDelete:'CASCADE',
      hooks: true,
      foreignKey: {
        name: "role_id",
        allowNull: false
      }
    });
    Users.belongsTo(models.users_role, {
      // onDelete:'CASCADE',
      hooks: true,
      foreignKey: {
        name: "role_id",
        allowNull: false
      }
    });
    Users.hasMany(models.childs);
    Users.hasMany(models.support);
    Users.hasMany(models.teacher_info);
    Users.hasMany(models.class_teachers, { foreignKey: "teacher_id", as: "class_info" })
    Users.hasMany(models.staff_hiring_form_detail, { foreignKey: 'teacher_id' });
    Users.hasMany(models.teacher_training_detail, { foreignKey: 'teacher_id' });
  };

  return Users;
};
