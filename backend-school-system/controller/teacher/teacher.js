const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require("../../models");
const CNST = require("../../config/constant");
const { sendEmail } = require('../../helper/email');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/web_config.json')[env];
const { getUserRole } = require('../../helper/helper');
const { imageUpload } = require("../../helper/s3upload");
const signatureModels = ['staff_handbook_waiver_detail', 'staff_administrative_teaching_staff_detail', 'staff_statement_of_compliance_with_cori_detail']
module.exports = {

  getInfo: async (req, res, next) => {
    try {
      const { id } = req.user;
      const info = await db.users.findOne({
        where: { id, has_deleted: 'false' },
        include: [
          { model: db.teacher_info },
          { model: db.teacher_training_detail }
        ]
      });
      if (!info) {
        return res.status(200).json({ data: [], message: CNST.SUCCESS });
      }
      return res.status(200).json({ data: info, message: CNST.SUCCESS });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  updateProfile: async (req, res, next) => {
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      let profile = req.body;
      //Check password object contain value or not
      if (!profile.password) {
        delete profile.password;
      }
      const teacher_id = req.user.id;
      // if (profile.signature.indexOf("https") === -1) {
      //   const fileName = await imageUpload(profile.signature, teacher_id);
      //   //Update signature value in model
      //   profile.signature = fileName;
      // }
      await db.users.update(profile, { where: { id: req.user.id } }, { transaction })
      await transaction.commit();
      return res.status(200).json({ message: CNST.TEACHER_UPDATE_SUCCESS })
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      return res.status(400).json({ message: error.message })
    }
  },
  updateInfo: async (req, res, next) => {
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const { user_info, teacher_info, training_info } = req.body, teacher_id = req.user.id;
      var user_info_before = '', user_info_after = '', teacher_info_before = '', teacher_info_after = '';

      user_info_before = await db.users.findOne({ where: { id: teacher_id }, attributes: { exclude: ['last_login', 'createdAt', 'updatedAt'] } }, { transaction })
      //Update user info
      const userRes = await db.users.update(
        user_info,
        { where: { id: teacher_id } }, { transaction }
      );
      user_info_after = await db.users.findOne({ where: { id: teacher_id }, attributes: { exclude: ['last_login', 'createdAt', 'updatedAt'] } }, { transaction })

      //Update teacher info
      //Update user id in teacher info table
      teacher_info.user_id = teacher_id;
      training_info.teacher_id = teacher_id;
      if (teacher_info.id) {
        teacher_info_before = await db.teacher_info.findOne({ where: { id: teacher_info.id }, attributes: { exclude: ['createdAt', 'updatedAt'] } }, { transaction })
        //Check teacher info already exist or not
        const teacherRes = await db.teacher_info.update(teacher_info, {
          where: { id: teacher_info.id },
          returning: true
        }, { transaction });
        teacher_info_after = await db.teacher_info.findOne({ where: { id: teacher_info.id }, attributes: { exclude: ['createdAt', 'updatedAt'] } }, { transaction })
      } else {
        teacher_info_after = await db.teacher_info.create(teacher_info, { transaction });
      }
      //Update training detail
      var trainingRes = "";
      if (training_info.training_detail_id) {
        //Update the training detail
        let training_detail_id = training_info.training_detail_id;
        trainingRes = await db.teacher_training_detail.update(training_info, { where: { training_detail_id } }, { transaction })
      }
      else {
        //Create the traing detail table and insert the data
        trainingRes = await db.teacher_training_detail.create(training_info, { transaction })
      }
      await transaction.commit();
      //Compare before and after data to check the changes and then send updates to admin
      var updatedInfo = [];
      //Compare teacher basic info
      for (let key in user_info_before._previousDataValues) {
        if (user_info_after[key] !== user_info_before[key]) {
          var obj = { key: [key], before: user_info_before[key], after: user_info_before[key] }
          updatedInfo.push(obj);
        }
      }
      for (let key in teacher_info_before._previousDataValues) {
        if (teacher_info_after[key] !== teacher_info_before[key]) {
          var obj = {
            key: [key],
            before: teacher_info_before[key] === "0" || 0 ? "checked" : teacher_info_before[key] === "1" || 1 ? "unchecked" : teacher_info_before[key],
            after: teacher_info_after[key] === "0" || 0 ? "checked" : teacher_info_after[key] === "1" || 1 ? "unchecked" : teacher_info_after[key]
          }
          updatedInfo.push(obj);
        }
      }

      let emailData = [{
        tableName: "teacher profile",
        email: config.email,
        adminName: config.name,
        loginUserName: `${req.user.first_name} ${req.user.last_name}`,
        loginUserEmail: req.user.email,
        role: getUserRole(req.user.role_id),
        updatedInfo: updatedInfo,
        contactEmail: config.contact_email,
        logo: config.email_logo
      }]
      if (updatedInfo.length) {
        // Send updates on admin email if anything changed in table.
        const emailResult = sendEmail('data_change_updates', emailData);
      }
      return res.status(200).json({ message: CNST.TEACHER_UPDATE_SUCCESS });
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      return res.status(400).json({ message: error.message });
    }
  },
  classList: async (req, res, next) => {
    try {
      var page_number = parseInt(req.query.page_number) || CNST.DEFAULT_PAGE_NUMBER,
        page_size = parseInt(req.query.page_size) || CNST.DEFAULT_PAGE_SIZE,
        page_number = page_number <= 1 ? 0 : ((page_number * page_size) - page_size);

      const orderBy = [], teacher_id = req.user.id;
      const classes = await db.classes.findAndCountAll({
        where: { has_deleted: 'false' },
        attributes: ['id', 'class_name', 'class_age', 'room', 'location', 'createdAt'],
        include: [{
          model: db.class_teachers,
          as: "teachers",
          attributes: ['id', 'teacher_id'],
          where: { teacher_id: teacher_id },
          include: [{
            model: db.users,
            attributes: ['first_name', 'last_name']
          }],
        }],
        distinct: true,
        // Add order conditions here....
        order: [
          ['id', 'DESC']
        ],
        offset: page_number, limit: page_size
      }, { rows: false });
      return res.status(200).json({ data: classes.rows, total_records: classes.count, message: CNST.DATA_LOAD_SUCCESS })
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  studentList: async (req, res, next) => {
    try {
      var page_number = parseInt(req.query.page_number) || CNST.DEFAULT_PAGE_NUMBER,
        page_size = parseInt(req.query.page_size) || CNST.DEFAULT_PAGE_SIZE,
        page_number = page_number <= 1 ? 0 : ((page_number * page_size) - page_size);
      const orderBy = [], teacher_id = req.user.id;
      const childs = await db.childs.findAndCountAll({

        include: [
          { model: db.users, attributes: ['signature'], where: { active: 1, has_deleted: 'false' }, required: true },
          { model: db.child_parent_info, as: 'parentInfo' },
          {
            model: db.classes, attributes: ['id', 'class_name', 'room', 'location'], where: { has_deleted: 'false' },
            include: [
              {
                model: db.class_teachers, as: "teachers", attributes: [],
                where: { teacher_id: teacher_id }
              }
            ],
          },
        ],
        distinct: true,
        offset: page_number, limit: page_size,
        order: [
          ['id', 'DESC']
        ],
        raw: false
      }, { rows: false })
      return res.status(200).json({ data: childs.rows, total_records: childs.count, message: CNST.DATA_LOAD_SUCCESS })
    } catch (err) {

      return res.status(400).json({ message: err.message })
    }

  },
  addStaffHiringFormDetail: async (req, res, next) => {
    let transaction = "";
    try {
      var { type, staff_detail_id } = req.body, result = "", teacher_id = req.user.id;
      transaction = await db.sequelize.transaction();
      if (type === "staff_references_detail") {
        for (let k = 0; k < req.body[type].length; k++) {
          req.body[type][k].teacher_id = teacher_id;
          req.body[type][k].staff_detail_id = staff_detail_id;
        }
        result = await db[type].bulkCreate(req.body[type], { transaction });
      }
      else {
        req.body[type].teacher_id = teacher_id;
        if (type !== "staff_hiring_form_detail") {
          req.body[type].staff_detail_id = staff_detail_id;
        }
        result = await db[type].create(req.body[type], { transaction });
      }
      await transaction.commit();
      if (type === "staff_hiring_form_detail") {
        return res.status(200).json({ staff_detail_id: result.staff_detail_id, message: CNST.SUCCESS_MSG })
      } else {
        return res.status(200).json({ message: CNST.SUCCESS_MSG })
      }
    }
    catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      return res.status(400).json({ message: error.message })
    }
  },
  updateStaffHiringFormDetail: async (req, res, next) => {
    let transaction = "";
    try {
      var { type, staff_detail_id } = req.body, result = "", teacher_id = req.user.id;

      transaction = await db.sequelize.transaction();
      //Update request
      if (type === "staff_references_detail") {
        var response = await db[type].destroy({ where: { staff_detail_id } }, { transaction })
        for (let k = 0; k < req.body[type].length; k++) {
          req.body[type][k].teacher_id = teacher_id;
          req.body[type][k].staff_detail_id = staff_detail_id;
        }
        result = await db[type].bulkCreate(req.body[type], { transaction });
        await transaction.commit();
        return res.status(200).json({ message: CNST.SUCCESS_MSG })
      }
      else {
        req.body[type].teacher_id = teacher_id;
        if (type !== "staff_hiring_form_detail") {
          req.body[type].staff_detail_id = staff_detail_id;
        }
        result = await db[type].update(req.body[type], { where: { staff_detail_id } }, { transaction });
        await transaction.commit();
        return res.status(200).json({ message: CNST.SUCCESS_MSG })
      }

    }
    catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      return res.status(400).json({ message: error.message })
    }
  },
  viewStaffHiringFormDetail: async (req, res, next) => {
    try {
      const teacher_id = req.user.id;
      const staffView = await db.staff_hiring_form_detail.findAll({
        where: { teacher_id },
        include: [
          { model: db.users, attributes: ['signature'], where: { active: 1, has_deleted: 'false' }, required: true },
          { model: db.staff_administrative_teaching_staff_detail },
          { model: db.staff_education_detail },
          { model: db.staff_emergency_detail },
          { model: db.staff_handbook_waiver_detail },
          { model: db.staff_personal_reference_detail },
          { model: db.staff_professional_reference_detail },
          { model: db.staff_references_detail },
          { model: db.staff_statement_of_compliance_with_cori_detail }
        ]
        // distinct: true,
      }, { rows: false })
      return res.status(200).json({ data: staffView, message: CNST.SUCCESS })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
};
