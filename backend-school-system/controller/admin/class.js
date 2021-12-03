const db = require("../../models");
const CNST = require("../../config/constant");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { sendEmail } = require("../../helper/email");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/web_config.json")[env];
const { getUserRole } = require("../../helper/helper");
module.exports = {
  list: async (req, res, next) => {
    try {
      var page_number =
          parseInt(req.query.page_number) || CNST.DEFAULT_PAGE_NUMBER,
        page_size = parseInt(req.query.page_size) || CNST.DEFAULT_PAGE_SIZE,
        page_number =
          page_number <= 1 ? 0 : page_number * page_size - page_size;

      const orderBy = [];
      const classes = await db.classes.findAndCountAll(
        {
          where: { has_deleted: "false"
          // , class_name: { [Op.ne]: "" } 
        },
          attributes: [
            "id",
            "class_name",
            "class_age",
            "room",
            "location",
            "createdAt",
          ],
          include: [
            {
              model: db.class_teachers,
              as: "teachers",
              attributes: ["id", "teacher_id"],
              include: [
                {
                  model: db.users,
                  attributes: ["first_name", "last_name"],
                  where: { has_deleted: "false" },
                },
              ],
            },
            {
              model: db.childs,
              as: "children",
              attributes: ["id", "class_id", "first_name", "last_name"],
            },
          ],
          distinct: true,
          // Add order conditions here....
          order: [["id", "DESC"]],
          // offset: page_number,
          // limit: page_size,
        },
        { rows: false }
      );
      return res.status(200).json({
        data: classes.rows,
        total_records: classes.count,
        message: CNST.DATA_LOAD_SUCCESS,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  add: async (req, res, next) => {
    try {
      const {
        class_name,
        class_age,
        room,
        location,
        teachers,
        children,
      } = req.value.body;
      const classObj = { class_name, class_age, room, location };

      // Check duplicate class name
      const hasExist = await db.classes.findOne({
        where: {
          class_name: `${class_name}`,
        },
      });
      if (!hasExist) {
        const classRes = await db.classes.create(classObj);
        if (teachers.length) {
          const teacherArr = [];
          for (let i = 0; i < teachers.length; i++) {
            let obj = {
              teacher_id: teachers[i],
              class_id: classRes.id,
            };
            teacherArr.push(obj);
          }
          const classTeacherRes = await db.class_teachers.bulkCreate(
            teacherArr
          );
        }
        if (children.length > 0) {
          const childObj = {
            classId: classRes.id,
          };
          const childrenIds = children.map((child) => child.id);
          await db.childs.update(childObj, {
            where: { id: { [Op.in]: childrenIds } },
          });
        }
        return res.status(200).json({ message: CNST.CLASS_ADD_SUCCESS });
      } else {
        return res.status(400).json({ message: CNST.CLASS_NAME_EXIST });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  update: async (req, res, next) => {
    try {
      const {
        id,
        class_name,
        class_age,
        room,
        location,
        teachers,
        children,
      } = req.value.body;
      const classObj = { class_name, class_age, room, location };

      // Check duplicate class name
      const hasExist = await db.classes.findOne({
        where: {
          [Op.and]: {
            class_name: `${class_name}`,
            id: { [Op.not]: `${id}` },
          },
        },
      });
      if (!hasExist) {
        // Fetch class data and store in object to compare later with updated data
        const classBefore = await db.classes.findOne({
          where: { id: id },
          attributes: ["class_name", "class_age", "room", "location"],
          include: [
            {
              model: db.class_teachers,
              as: "teachers",
              attributes: ["id", "teacher_id"],
              include: [
                {
                  model: db.users,
                  attributes: ["first_name", "last_name"],
                },
              ],
            },
          ],
        });
        let modifiedClassBeforeData = classBefore._previousDataValues;
        delete modifiedClassBeforeData.teachers;

        // finalClassBeforeData = classBefore.teachers ? Object.assign(classBefore.teachers[0]._previousDataValues.user._previousDataValues,modifiedClassBeforeData) : modifiedClassBeforeData;

        if (classBefore.teachers.length) {
          for (let i = 0; i < classBefore.teachers.length; i++) {
            modifiedClassBeforeData[
              "teacher " + (i + 1)
            ] = `${classBefore.teachers[i].user.first_name} ${classBefore.teachers[i].user.last_name}`;
          }
        }

        await db.classes.update(classObj, {
          where: { id: id },
        });
        // This method will update existing classId to null in child table
        await db.childs.update(
          { classId: null },
          {
            where: { classId: id },
          }
        );
        if (children.length > 0) {
          const childrenIds = children.map((child) => child.id);
          // This method will update selected children of class with classId in child table
          await db.childs.update(
            { classId: id },
            { where: { id: { [Op.in]: childrenIds } } }
          );
        }
        if (teachers.length) {
          const teacherArr = [];
          for (let i = 0; i < teachers.length; i++) {
            let obj = {
              teacher_id: teachers[i],
              class_id: id,
            };
            teacherArr.push(obj);
          }
          // Delete teachers and class from class_teacher table and insert new data
          const deleteRes = await db.class_teachers.destroy({
            where: { class_id: id },
          });
          // Add new data
          const classTeacherRes = await db.class_teachers.bulkCreate(
            teacherArr
          );
        }

        const classAfter = await db.classes.findOne({
          where: { id: id },
          attributes: ["class_name", "class_age", "room", "location"],
          include: [
            {
              model: db.class_teachers,
              as: "teachers",
              attributes: ["id", "teacher_id"],
              include: [
                {
                  model: db.users,
                  attributes: ["first_name", "last_name"],
                },
              ],
            },
          ],
        });
        let modifiedClassAfterData = classAfter._previousDataValues;
        delete modifiedClassAfterData.teachers;

        // let finalClassAfterData = classAfter.teachers ? Object.assign(classAfter.teachers[0]._previousDataValues.user._previousDataValues, modifiedClassAfterData) : modifiedClassAfterData;

        if (classAfter.teachers.length) {
          for (let i = 0; i < classAfter.teachers.length; i++) {
            modifiedClassAfterData[
              "teacher " + (i + 1)
            ] = `${classAfter.teachers[i].user.first_name} ${classAfter.teachers[i].user.last_name}`;
          }
        }
        // Compare both before and after record. Get only changes fields
        var updatedInfo = [];
        for (let key in modifiedClassAfterData) {
          if (modifiedClassAfterData[key] !== modifiedClassBeforeData[key]) {
            var obj = {
              key: [key],
              before: modifiedClassBeforeData[key],
              after: modifiedClassAfterData[key],
            };
            updatedInfo.push(obj);
          }
        }
        if (updatedInfo.length) {
          let emailData = [
            {
              tableName: "class",
              email: config.email,
              adminName: config.name,
              loginUserName: `${req.user.first_name} ${req.user.last_name}`,
              loginUserEmail: req.user.email,
              role: getUserRole(req.user.role_id),
              updatedInfo: updatedInfo,
              contactEmail: config.contact_email,
              logo: config.email_logo,
            },
          ];
          // Send updates on admin email if anything changed in table.
          const emailResult = sendEmail("data_change_updates", emailData);
        }

        return res.status(200).json({ message: CNST.CLASS_UPDATE_SUCCESS });
      } else {
        return res.status(400).json({ message: CNST.CLASS_NAME_EXIST });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  search: async (req, res, next) => {
    try {
      var page_number =
          parseInt(req.query.page_number) || CNST.DEFAULT_PAGE_NUMBER,
        page_size = parseInt(req.query.page_size) || CNST.DEFAULT_PAGE_SIZE,
        page_number =
          page_number <= 1 ? 0 : page_number * page_size - page_size;

      const searchQuery = req.query.searchQuery;
      const classData = await db.classes.findAndCountAll(
        {
          where: {
            has_deleted: "false",
            [Op.or]: {
              class_name: { [Op.like]: `%${searchQuery}%` },
              class_age: { [Op.like]: `%${searchQuery}%` },
            },
          },
          attributes: [
            "id",
            "class_name",
            "class_age",
            "room",
            "location",
            "createdAt",
          ],
          include: [
            {
              model: db.class_teachers,
              as: "teachers",
              attributes: ["id", "teacher_id"],
              include: [
                {
                  model: db.users,
                  attributes: ["first_name", "last_name"],
                },
              ],
            },
          ],
          distinct: true,
          // Add order conditions here....
          order: [["id", "DESC"]],
          offset: page_number,
          limit: page_size,
        },
        { rows: false }
      );
      return res.status(200).json({
        data: classData.rows,
        total_records: classData.count,
        message: CNST.DATA_LOAD_SUCCESS,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  delete: async (req, res, next) => {
    try {
      const childId = req.query.id;
      const classObj = { has_deleted: "true" };
      await db.classes.update(classObj, {
        where: { id: childId },
      });
      await db.childs.update(
        { classId: null },
        {
          where: { classId: childId },
        }
      );
      return res.status(200).json({ message: CNST.CLASS_DELETE_SUCCESS });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
