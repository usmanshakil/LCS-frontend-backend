const moment = require("moment");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { sendEmail } = require("../helper/email");
const db = require("../models");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/web_config.json")[env]

warningSchedularToExpiredStudentAdmissionDate = async () => {
  const nowDate = moment().format("YYYY-MM-DD");
  const addedOneMonthOnToday = moment(nowDate)
    .add(30, "days")
    .format("YYYY-MM-DD");
  db.child_parent_info
    .findAll({
      attributes: ["id", "parent_type", "first_name", "last_name", "email1"],
      include: [
        {
          model: db.users,
          attributes: ["first_name", "last_name", "email"],
          where: { has_deleted: "false" },
        },
        {
          model: db.childs,
          attributes: [
            "id",
            "admission_date",
            "first_name",
            "last_name",
            "expiry_date",
          ],
          where: {
            has_deleted: "false",
            expiry_date: {
              [Op.between]: [nowDate, addedOneMonthOnToday],
            },
          },
        },
      ],
      where: {
        parent_type: "parent1",
      },
    })
    .then((results) => {
      if (results.length) {
        let studentsListOfWarningEmail = [];
        const warningEmailBeforeDays = [30, 15, 7, 2, 1];
        warningEmailBeforeDays.forEach((date) => {
          const students = results.filter(
            (data) =>
              moment(data.child.expiry_date).format("YYYY-MM-DD") ===
              moment(nowDate).add(date, "days").format("YYYY-MM-DD")
          );
          students.length
            ? students.map((data) => {
                data.expiredOn = date;
                return data;
              })
            : [];
          studentsListOfWarningEmail = [
            ...studentsListOfWarningEmail,
            ...students,
          ];
        });
        if (studentsListOfWarningEmail.length) {
          const emailData = [];
          studentsListOfWarningEmail.forEach((data) => {
            const emailObject = {
              email: data.user.email,
              parentFullName: data.user.first_name + " " + data.user.last_name,
              childFullName: data.child.first_name + " " + data.child.last_name,
              expiryDate: moment(data.child.expiry_date).format("YYYY-MM-DD"),
              expired: data.expiredOn,
              expired1Day: data.expiredOn === 1 ? true : false,
              contactEmail: config.contact_email,
              logo: config.email_logo,
              renewalLink: config.web_site_url + "student",
            };
            emailData.push(emailObject);
          });
          sendEmail("expiry_date_notification", emailData);
        } else {
          console.log("No student Warning Email Sent.");
        }
      } else {
        console.log("No student admission Date fall near to expire");
      }
    })
    .catch((error) => {
      console.log("Error occurred:", error);
    });
};

module.exports = { warningSchedularToExpiredStudentAdmissionDate };