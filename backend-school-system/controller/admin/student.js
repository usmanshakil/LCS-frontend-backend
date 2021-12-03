var Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require("moment");
const db = require("../../models");
const CNST = require("../../config/constant");
const { sendEmail } = require("../../helper/email");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/web_config.json")[env];
const { getUserRole } = require("../../helper/helper");
module.exports = {
  studentListForMultiSelect: async (req, res, next) => {
    try {
      const classId =
        req.query?
        req.query.classId && req.query.classId !== `undefined`
          ? [null, Number(req.query.classId)]
          : [null]:[null];

      const children = await db.childs.findAndCountAll({
        attributes: ["id", "first_name", "last_name"],
        where: {
          has_deleted: "false",
          class_id: {
            [Op.or]: classId,
          },
        },
        order: [["id", "DESC"]],
      });
      return res.status(200).json({
        data: children.rows,
        total_records: children.count,
        message: CNST.DATA_LOAD_SUCCESS,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  list: async (req, res, next) => {
    try {
      let page_number =
          parseInt(req.query.page_number) || CNST.DEFAULT_PAGE_NUMBER,
        page_size = parseInt(req.query.page_size) || CNST.DEFAULT_PAGE_SIZE;
      (page_number =
        page_number <= 1 ? 0 : page_number * page_size - page_size),
        (order_by_column = req.query.column || ""),
        (order_type = req.query.order || "ASC");
      order_type = order_type === "ascending" ? "ASC" : "DESC";
      let { status } = req.query || "Active";
      status = status.toLowerCase() === "active" ? 1 : 0;

      // console.log("order_by_column", order_by_column);
      let order = [];
      if (order_by_column === "studentClassName")
        order.push([
          { model: db.classes },
          [db.sequelize.col("classes.class_name", "class_name")],
          "class_name",
          order_type,
        ]);
      else if (order_by_column === "childFirstName")
        order.push(["first_name", order_type]);
      else if (order_by_column === "childLastName")
        order.push(["last_name", order_type]);
      else if (
        order_by_column === "parent1FirstName" ||
        order_by_column === "parent1LastName"
      ) {
        order.push([
          { model: db.child_parent_info, as: "parentInfo" },
          "parent_type",
          "ASC",
        ]);
        order.push([
          { model: db.child_parent_info, as: "parentInfo" },
          order_by_column.includes("FirstName") ? "first_name" : "last_name",
          order_type,
        ]);
      } else if (
        order_by_column === "parent2FirstName" ||
        order_by_column === "parent2LastName"
      ) {
        order.push([
          { model: db.child_parent_info, as: "parentInfo" },
          "parent_type",
          "DESC",
        ]);
        order.push([
          { model: db.child_parent_info, as: "parentInfo" },
          order_by_column.includes("FirstName") ? "first_name" : "last_name",
          order_type,
        ]);
      } else order.push(["id", "DESC"]);
      // console.log("order", order);

      const children = await db.childs.findAndCountAll(
        {
          // logging: true,
          where: { has_deleted: "false" },
          include: [
            {
              model: db.classes,
              attributes: ["class_name"],
              where: { has_deleted: "false" },
              required: false,
            },
            {
              model: db.users,
              attributes: ["signature"],
              where: { active: status, has_deleted: "false" },
              required: true,
            },
            {
              model: db.child_parent_info,
              as: "parentInfo",
              required: false,
            },
            {
              model: db.child_medical_info,
              as: "medicalInfo",
              required: false,
              include: [
                {
                  model: db.medical_reports,
                  as: "medical_reports",
                  required: false,
                },
              ],
            },
          ],

          // Add order conditions here....
          order: order,
          distinct: true,

          offset: page_number,
          limit: page_size,
        },
        { rows: false }
      );
      return res.status(200).json({
        data: children.rows,
        total_records: children.count,
        message: CNST.DATA_LOAD_SUCCESS,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },



  // checklist start
  get_student_checklist: async (req, res, next) => {
    try { 
      var classId =   parseInt(req.query.classId)  
      const childs = await db.childs.findAll(
        {
          where: { has_deleted: "false"
          ,class_id:classId
        },
          include: [
            {
              model: db.users,
              attributes: ["signature"],
              where: { has_deleted: "false" },
              required: true,
            },
            {
              model: db.child_parent_info,
              as: "parentInfo",
              required: false,
            },
            {
              model: db.child_medical_info,
              as: "medicalInfo",
              required: false,
              include: [
                {
                  model: db.medical_reports,
                  as: "medical_reports",
                  required: false,
                },
              ],
            },  
           
            {
              model: db.child_emergency_contact_info,
              as: "emergencyInfo",
              required: false,
            },
            {
              model: db.child_development_report,
              as: "devReport",
              required: false,
            },
            {
              model: db.child_health_report,
              as: "healthReport",
              required: false,
            },
            {
              model: db.child_eating_habit,
              as: "eatingHabitReport",
              required: false,
            },
            {
              model: db.child_toilet_habit,
              as: "toiletHabitReport",
              required: false,
            },
            {
              model: db.child_sleeping_habit,
              as: "sleepingHabitReport",
              required: false,
            },
            {
              model: db.child_social_relationship,
              as: "socialRelationshipReport",
              required: false,
            },
            {
              model: db.child_daily_schedule,
              as: "dailyScheduleReport",
              required: false,
            },
            {
              model: db.child_photo_release,
              as: "photoRelease",
              required: false,
            },
            {
              model: db.child_local_trip_permission,
              as: "localTripPermission",
              required: false,
            },
            {
              model: db.child_parent_agreement,
              as: "parentAgreement",
              required: false,
            },
            {
              model: db.child_authorization_and_consent,
              as: "authorizationAndConsent",
              required: false,
            },
            {
              model: db.child_sunscreen_permissions,
              as: "sunscreenPermission",
              required: false,
            },
            {
              model: db.child_toothbrushing_info,
              as: "toothBrushingInformation",
              required: false,
            },
            {
              model: db.child_transport_authority,
              as: "transportAuthority",
              required: false,
            },
            {
              model: db.child_school_directory_info,
              as: "schoolDirectory",
              required: false,
            }
          ],
          distinct: true,
        },
        { rows: false }
      );
      return res
        .status(200)
        .json({ data: childs, message: CNST.DATA_LOAD_SUCCESS });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  
  // checklist ended
  get_one: async (req, res, next) => {
    try {
      let { id } = req.query;
      const childs = await db.childs.findOne(
        {
          where: { has_deleted: "false", id },
          include: [
            {
              model: db.users,
              attributes: ["signature"],
              where: { has_deleted: "false" },
              required: true,
            },
            {
              model: db.child_parent_info,
              as: "parentInfo",
              required: false,
            },
            {
              model: db.child_medical_info,
              as: "medicalInfo",
              required: false,
              include: [
                {
                  model: db.medical_reports,
                  as: "medical_reports",
                  required: false,
                },
              ],
            },
            {
              model: db.child_emergency_contact_info,
              as: "emergencyInfo",
              required: false,
            },
            {
              model: db.child_development_report,
              as: "devReport",
              required: false,
            },
            {
              model: db.child_health_report,
              as: "healthReport",
              required: false,
            },
            {
              model: db.child_eating_habit,
              as: "eatingHabitReport",
              required: false,
            },
            {
              model: db.child_toilet_habit,
              as: "toiletHabitReport",
              required: false,
            },
            {
              model: db.child_sleeping_habit,
              as: "sleepingHabitReport",
              required: false,
            },
            {
              model: db.child_social_relationship,
              as: "socialRelationshipReport",
              required: false,
            },
            {
              model: db.child_daily_schedule,
              as: "dailyScheduleReport",
              required: false,
            },
            {
              model: db.child_photo_release,
              as: "photoRelease",
              required: false,
            },
            {
              model: db.child_local_trip_permission,
              as: "localTripPermission",
              required: false,
            },
            {
              model: db.child_parent_agreement,
              as: "parentAgreement",
              required: false,
            },
            {
              model: db.child_authorization_and_consent,
              as: "authorizationAndConsent",
              required: false,
            },
            {
              model: db.child_sunscreen_permissions,
              as: "sunscreenPermission",
              required: false,
            },
            {
              model: db.child_toothbrushing_info,
              as: "toothBrushingInformation",
              required: false,
            },
            {
              model: db.child_transport_authority,
              as: "transportAuthority",
              required: false,
            },
            {
              model: db.child_school_directory_info,
              as: "schoolDirectory",
              required: false,
            },
          ],
          distinct: true,
        },
        { rows: false }
      );
      return res
        .status(200)
        .json({ data: childs, message: CNST.DATA_LOAD_SUCCESS });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  update: async (req, res, next) => {
    try {
      const type = req.body.type;
      var table_name = "";
      switch (type) {
        case "childInfo":
          table_name = "childs";
          break;
        // const child_info_res = await db.childs.update(req.body[type], { where: { id: req.body[type].id } });
        case "parent1":
        case "parent2":
          table_name = "child_parent_info";
          break;
        case "medicalInformation":
          table_name = "child_medical_info";
          break;
        case "emergencyContact1":
        case "emergencyContact2":
          table_name = "child_emergency_contact_info";
          break;
        case "devReport":
          table_name = "child_development_report";
          break;
        case "childHealth":
          table_name = "child_health_report";
          break;
        case "childEatingHabit":
          table_name = "child_eating_habit";
          break;
        case "childToiletHabit":
          table_name = "child_toilet_habit";
          break;
        case "childSleepingHabit":
          table_name = "child_sleeping_habit";
          break;
        case "socialRelationship":
          table_name = "child_social_relationship";
          break;
        case "dailySchedule":
          table_name = "child_daily_schedule";
          break;
        case "photoRelease":
          table_name = "child_photo_release";
          break;
        case "localTripPermission":
          table_name = "child_local_trip_permission";
          break;
        case "parentAgreement":
          table_name = "child_parent_agreement";
          break;
        case "authorizationAndConsent":
          table_name = "child_authorization_and_consent";
          break;
        case "sunscreenPermission":
          table_name = "child_sunscreen_permissions";
          break;
        case "toothBrushingInformation":
          table_name = "child_toothbrushing_info";
          break;
        case "transportAuthority":
          table_name = "child_transport_authority";
          break;
        case "schoolDirectory":
          table_name = "child_school_directory_info";
          break;
        default:
          break;
      }
      let before,
        after = "";
      if (req.body[type].id) {
        // Get data before updation
        before = await db[table_name].findOne({
          where: { id: req.body[type].id },
          attributes: { exclude: ["createdAt", "updatedAt"] },
        });

        // Update data
        if (table_name === "child_medical_info") {
          let physical_report_arr = req.body[type].medical_reports;
          delete req.body[type].medical_reports;
          let childMedicalInfo = await db[table_name].update(req.body[type], {
            where: { id: req.body[type].id },
          });
          await db.medical_reports.destroy({
            where: { child_medical_info_id: req.body[type].id },
          });
          if (physical_report_arr.length) {
            let reportArr = [];
            physical_report_arr.forEach(function (report) {
              let reportObj = {
                child_medical_info_id: req.body[type].id,
                physical_report: report.physical_report,
              };
              reportArr.push(reportObj);
            });
            await db.medical_reports.bulkCreate(reportArr);
          }
        } else {
          const result = await db[table_name].update(req.body[type], {
            where: { id: req.body[type].id },
          });
        }

        // Get data after updation
        after = await db[table_name].findOne({
          where: { id: req.body[type].id },
          attributes: { exclude: ["createdAt", "updatedAt"] },
        });

        // Compare before and after data to check the difference and send email to admin
        var updatedInfo = [];
        for (let key in before._previousDataValues) {
          if (before[key] !== after[key]) {
            if (key === "class_id") {
              const classData = await db.classes.findAll({
                where: { id: { [Op.in]: [`${before[key]}`, `${after[key]}`] } },
                attributes: ["class_name"],
              });
              if (classData.length) {
                for (let classKey in classData[0]._previousDataValues) {
                  if (classData.length === 1) {
                    let obj = {
                      key: [classKey],
                      before: classData[0][classKey],
                      after: "",
                    };
                    updatedInfo.push(obj);
                  } else {
                    let obj = {
                      key: [classKey],
                      before: classData[0][classKey],
                      after: classData[1][classKey],
                    };
                    updatedInfo.push(obj);
                  }
                }
              }
            } else {
              var obj = {
                key: [key],
                before:
                  before[key] === "0"
                    ? "checked"
                    : before[key] === "1"
                    ? "unchecked"
                    : before[key],
                after:
                  after[key] === "0"
                    ? "checked"
                    : after[key] === "1"
                    ? "unchecked"
                    : after[key],
              };
              updatedInfo.push(obj);
            }
          }
        }
        if (updatedInfo.length) {
          let emailData = [
            {
              tableName: `child data under ${table_name}`,
              email: config.email,
              adminName: config.name,
              loginUserEmail: req.user.email,
              role: getUserRole(req.user.role_id),
              loginUserName: `${req.user.first_name} ${req.user.last_name}`,
              updatedInfo: updatedInfo,
              contactEmail: config.contact_email,
              logo: config.email_logo,
            },
          ];
          // Send updates on admin email if anything changed in table.
          const emailResult = sendEmail("data_change_updates", emailData);
        }
        return res.status(200).json({ message: CNST.CHILD_UPDATED_SUCCESS });
      } else {
        if (req.body[type].user_id) {
          if (table_name === "child_medical_info") {
            let physical_reports_arr = req.body[type].medical_reports;
            delete req.body[type].medical_reports;
            let childMedicalInfo = await db[table_name].create(req.body[type]);
            await db.medical_reports.destroy({
              where: { child_medical_info_id: req.body[type].id },
            });
            if (physical_reports_arr.length) {
              let reportArr = [];
              physical_reports_arr.forEach(function (report) {
                let reportObj = {
                  child_medical_info_id: req.body[type].id,
                  physical_report: report.physical_report,
                };
                reportArr.push(reportObj);
              });
              await db.medical_reports.bulkCreate(reportArr);
            }
          } else {
            const result = await db[table_name].create(req.body[type]);
          }
          return res.status(200).json({ message: CNST.CHILD_UPDATED_SUCCESS });
        } else {
          return res.status(400).json({ message: CNST.USER_ID_REQUIRED });
        }
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  renewalOrExpiredChilds: async (req, res, next) => {
    try {
      var page_number =
          parseInt(req.query.page_number) || CNST.DEFAULT_PAGE_NUMBER,
        page_size = parseInt(req.query.page_size) || CNST.DEFAULT_PAGE_SIZE,
        page_number =
          page_number <= 1 ? 0 : page_number * page_size - page_size,
        status = req.query.status || "";
      const expired = req.query.expired || false;
      let whereCondition = "";
      if (expired === "true") {
        whereCondition = {
          expiry_date: {
            [Op.lt]: moment().format("YYYY-MM-DD"),
          },
        };
      } else {
        whereCondition = {
          expiry_date: {
            [Op.between]: [
              moment().format("YYYY-MM-DD"),
              moment().add(30, "days").format("YYYY-MM-DD"),
            ],
          },
        };
      }
      const data = await db.childs.findAndCountAll({
        where: whereCondition,
        include: [
          {
            model: db.users,
            required: true,
            where: { has_deleted: "false" },
          },
        ],
        order: [["expiry_date", "ASC"]],
        offset: page_number,
        limit: page_size,
      });
      return res.status(200).json({
        data: data.rows,
        total_records: data.count,
        message: CNST.SUCCESS,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  searchStudent: async (req, res, next) => {
    try {
      let { searchQuery, status } = req.query,
        order_by_column = req.query.column || "",
        order_type = req.query.order || "ASC";
      (order_type = order_type === "ascending" ? "ASC" : "DESC"),
        (status = status.toLowerCase() === "active" ? 1 : 0);

      // console.log("order_by_column", order_by_column);
      let order = [];
      if (order_by_column === "studentClassName")
        order.push([
          { model: db.classes },
          [db.sequelize.col("classes.class_name", "class_name")],
          "class_name",
          order_type,
        ]);
      else if (order_by_column === "childFirstName")
        order.push(["first_name", order_type]);
      else if (order_by_column === "childLastName")
        order.push(["last_name", order_type]);
      else if (
        order_by_column === "parent1FirstName" ||
        order_by_column === "parent1LastName"
      ) {
        order.push([
          { model: db.child_parent_info, as: "parentInfo" },
          "parent_type",
          "ASC",
        ]);
        order.push([
          { model: db.child_parent_info, as: "parentInfo" },
          order_by_column.includes("FirstName") ? "first_name" : "last_name",
          order_type,
        ]);
      } else if (
        order_by_column === "parent2FirstName" ||
        order_by_column === "parent2LastName"
      ) {
        order.push([
          { model: db.child_parent_info, as: "parentInfo" },
          "parent_type",
          "DESC",
        ]);
        order.push([
          { model: db.child_parent_info, as: "parentInfo" },
          order_by_column.includes("FirstName") ? "first_name" : "last_name",
          order_type,
        ]);
      } else order.push(["id", "DESC"]);
      const searchData = await db.childs.findAll({
        where: {
          has_deleted: "false",
          [Op.or]: [
            {
              first_name: { [Op.like]: `%${searchQuery}%` },
            },
            {
              last_name: { [Op.like]: `%${searchQuery}%` },
            },
            {
              "$parentInfo.first_name$": { [Op.like]: `%${searchQuery}%` },
            },
            {
              "$parentInfo.last_name$": { [Op.like]: `%${searchQuery}%` },
            },
          ],
        },
        include: [
          {
            model: db.classes,
            attributes: ["class_name"],
            where: { has_deleted: "false" },
            required: false,
          },
          {
            model: db.users,
            attributes: ["signature"],
            where: { active: status, has_deleted: "false" },
            required: true,
          },
          { model: db.child_parent_info, as: "parentInfo" },
          {
            model: db.child_medical_info,
            as: "medicalInfo",
            include: [
              {
                model: db.medical_reports,
                as: "medical_reports",
                required: false,
              },
            ],
          },
        ],
        // raw: false,
        distinct: true,
        order: order,
      });
      return res.status(200).json({ data: searchData, message: CNST.SUCCESS });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  delete: async (req, res, next) => {
    try {
      const id = req.query.id;
      if (!id) {
        return res.status(400).json({ message: CNST.CHILD_ID_REQUIRED });
      }
      const childObj = {
        has_deleted: "true",
      };
      const result = await db.childs.update(childObj, { where: { id: id } });
      return res.status(200).json({ message: CNST.CHILD_DELETE_SUCCESS });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
