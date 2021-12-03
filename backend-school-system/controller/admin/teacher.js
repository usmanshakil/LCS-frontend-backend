const JWT = require("jsonwebtoken");
var Sequelize = require('sequelize');
const Op = Sequelize.Op
const db = require('../../models');
const CNST = require('../../config/constant');
const { sendEmail } = require('../../helper/email');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/web_config.json')[env];
const { getUserRole } = require('../../helper/helper');

module.exports = {
  list: async (req, res, next) => {
    try {
      var page_number = parseInt(req.query.page_number) || CNST.DEFAULT_PAGE_NUMBER,
        page_size = parseInt(req.query.page_size) || CNST.DEFAULT_PAGE_SIZE,
        page_number = page_number <= 1 ? 0 : ((page_number * page_size) - page_size),
        order_by_column = req.query.column || '', order_type = req.query.order || 'ASC',
        order_type = order_type === 'ascending' ? 'ASC' : 'DESC';
      status = req.query.status || '';
      var whereCondition = { role_id: CNST.ROLES.TEACHER, has_deleted: 'false' };
      if (status !== 'All' && status !== '') {
        whereCondition.active = status.toLowerCase() === 'active' ? 1 : 0
      }
      let order = [['id', 'DESC']];
      order_by_column ? order.push([order_by_column, order_type]) : '';
      const teacherList = await db.users.findAndCountAll({
        where: whereCondition,
        attributes: ['id', 'first_name', 'last_name', 'email', 'phone', 'cellphone', 'approved', 'email_confirmed', 'active', 'has_received_text', 'signature', 'created_at', 'last_login'],

        include: [
          {
            model: db.class_teachers, as: "class_info", attributes: ['class_id'],
            // where:{[Op.or]:{'$classes.has_deleted$':'false'}},
            include: [{
              model: db.classes, attributes: ['class_name'],
              where: { has_deleted: 'false' }, required: false
            }],
          },
          { model: db.teacher_info },
          { model: db.staff_hiring_form_detail }
        ],
        distinct: true,
        offset: page_number, limit: page_size,
        order,
        // raw: false
      }, { rows: false })
      return res.status(200).json({ data: teacherList.rows, total_records: teacherList.count, message: CNST.SUCCESS })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  },
  AllTeacherList: async (req, res, next) => {
    try {

      const teacherList = await db.users.findAll({
        where: { role_id: CNST.ROLES.TEACHER, has_deleted: 'false' },
        attributes: ['id', 'first_name', 'last_name'],
        order: [
          ['id', 'DESC']
        ],
        // raw: true
      }, { rows: false })
      return res.status(200).json({ data: teacherList, message: CNST.SUCCESS })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  },
  createTeacher: async (req, res, next) => {
    try {
      let { first_name, last_name, email } = req.value.body;
      //Add role for teacher
      req.value.body.role_id = CNST.ROLES.TEACHER;
      req.value.body.upproved = 1;
      req.value.body.active = 1;
      req.value.body.email_confirmed = 1;
      const hasTeacherExist = await db.users.findOne({ where: { email } });
      if (hasTeacherExist) {
        return res.status(400).json({ message: CNST.ACCOUNT_WITH_EMAIL_EXIST })
      }



      //Create new user
      const teacher = await db.users.create(req.value.body)

      // Generate token for email
      const token = JWT.sign(
        {
          iss: "beyondroot",
          sub: teacher.id,
          iat: new Date().getTime(), // current time
          expiry_date: new Date().setHours(new Date().getHours() + 2)
        },
        process.env.JWT_SECRET
      );
      //Update user
      const userUpdate = await db.users.update(
        { reset_password_token: token },
        { where: { id: teacher.id } }
      );

      //Send Email to teacher email id to set password
      const userData = [
        {
          name: `${first_name} ${last_name}`,
          email: email,
          signature: token,
          newPasswordAddress: config.web_site_url + config.setting_new_password + token,
          contactEmail: config.contact_email,
          logo: config.email_logo
        }
      ];
      const result = await sendEmail('teacher_signup', userData);

      //Create role
      const userRole = { user_id: teacher.id, role_id: teacher.role_id }
      const role = await db.users_role.create(userRole);
      return res.status(200).json({ message: CNST.USER_CREATED_SUCCESS })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  },
  update: async (req, res, next) => {
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const { user_info, teacher_info, training_info } = req.body;
      let beforeUserUpdate, afterUserUpdate;

      const beforeUser = await db.users.findOne({
        where: { id: user_info.id },
        attributes: ['first_name', 'last_name', 'email'],
        include: [{
          model: db.teacher_info,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }],
      }, { transaction });
      const beforeUserData = beforeUser._previousDataValues;
      delete beforeUserData.teacher_infos;
      beforeUserUpdate = beforeUser.teacher_infos.length ? Object.assign({}, beforeUser.teacher_infos[0]._previousDataValues, beforeUserData) : beforeUserData

      //Update user info
      const userRes = await db.users.update(user_info, { where: { id: user_info.id } }, { transaction })

      //Update teacher info
      //Update user id in teacher info table
      teacher_info.user_id = user_info.id;
      training_info.teacher_id = user_info.id;
      if (teacher_info.id) {
        //Check teacher info already exist or not
        const teacherRes = await db.teacher_info.update(teacher_info, {
          where: { id: teacher_info.id }
        }, { transaction });
      } else {
        const teacherRes = await db.teacher_info.create(teacher_info, { transaction });
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
      // Get teacher profile data and compare with previous data
      const afterUser = await db.users.findOne({
        where: { id: user_info.id },
        attributes: ['first_name', 'last_name', 'email'],
        include: [{
          model: db.teacher_info,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }],
      }, { transaction });
      const afterUserData = afterUser._previousDataValues;
      delete afterUserData.teacher_infos;
      afterUserUpdate = afterUser.teacher_infos.length ? Object.assign({}, afterUser.teacher_infos[0]._previousDataValues, afterUserData) : afterUserData

      var updatedInfo = [];
      for (let key in afterUserUpdate) {
        // console.log(key);
        if (afterUserUpdate[key] !== beforeUserUpdate[key]) {
          var obj = {
            key: [key],
            before: beforeUserUpdate[key] === "0" ? "checked" : beforeUserUpdate[key] === "1" ? "unchecked" : beforeUserUpdate[key],
            after: afterUserUpdate[key] === "0" ? "checked" : afterUserUpdate[key] === "1" ? "unchecked" : afterUserUpdate[key]
          }
          updatedInfo.push(obj);
        }
      }

      if (updatedInfo.length) {
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
        // Send updates on admin email if anything changed in table.
        const emailResult = sendEmail('data_change_updates', emailData)
      }

      return res.status(200).json({ message: CNST.TEACHER_UPDATE_SUCCESS });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  search: async (req, res, next) => {
    try {
      var page_number = parseInt(req.query.page_number) || CNST.DEFAULT_PAGE_NUMBER,
        page_size = parseInt(req.query.page_size) || CNST.DEFAULT_PAGE_SIZE,
        page_number = page_number <= 1 ? 0 : ((page_number * page_size) - page_size),
        order_by_column = req.query.column || '', order_type = req.query.order || 'ASC',
        order_type = order_type === 'ascending' ? 'ASC' : 'DESC';
      let { status, qs } = req.query;
      var whereCondition = {
        role_id: CNST.ROLES.TEACHER,
        has_deleted: 'false',
        [Op.or]: [
          {
            'first_name': { [Op.like]: `%${qs}%` }
          },
          {
            'last_name': { [Op.like]: `%${qs}%` }
          },
          {
            'email': { [Op.like]: `%${qs}%` }
          }
        ]
      };
      if (status !== 'All' && status !== '') {
        whereCondition.active = status.toLowerCase() === 'active' ? 1 : 0
      }
      let order = [['id', 'DESC']];
      order_by_column ? order.push([order_by_column, order_type]) : '';
      const teacherList = await db.users.findAndCountAll({
        where: whereCondition,
        attributes: ['id', 'first_name', 'last_name', 'email', 'phone', 'cellphone', 'approved', 'email_confirmed', 'active', 'has_received_text', 'signature', 'created_at', 'last_login'],
        include: [
          {
            model: db.class_teachers, as: "class_info", attributes: ['class_id'],
            // where:{[Op.or]:{'$classes.has_deleted$':'false'}},
            include: [{
              model: db.classes, attributes: ['class_name'],
              where: { has_deleted: 'false' }, required: false
            }],
          },
          { model: db.teacher_info }
        ],
        distinct: true,
        offset: page_number, limit: page_size,
        order
      }, { rows: false })
      return res.status(200).json({ data: teacherList.rows, total_records: teacherList.count, message: CNST.SUCCESS })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  },
  delete: async (req, res, next) => {
    try {
      const id = req.query.id;
      if (!id) {
        return res.status(400).json({ message: CNST.TEACHER_ID_REQUIRED })
      }
      const obj = {
        has_deleted: "true"
      }
      const deleteRes = await db.users.update(obj, { where: { id: id } })
      return res.status(200).json({ message: CNST.TEACHER_DELETE_SUCCESS })
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  viewStaffHiringForm: async (req, res, next) => {
    try {
      const { teacher_id } = req.params;
      if (!teacher_id) {
        return res.status(400).json({ message: CNST.TEACHER_ID_REQUIRED })
      }
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
  },
  teacherDetailById: async (req, res, next) => {
    try {
      const { teacher_id } = req.params;
      const teacherList = await db.users.findAll({
        where: { id: teacher_id },
        attributes: ['id', 'first_name', 'last_name', 'email', 'phone', 'cellphone', 'approved', 'email_confirmed', 'active', 'has_received_text', 'signature', 'created_at', 'last_login'],

        include: [
          {
            model: db.class_teachers, as: "class_info", attributes: ['class_id'],
            // where:{[Op.or]:{'$classes.has_deleted$':'false'}},
            include: [{
              model: db.classes, attributes: ['class_name'],
              where: { has_deleted: 'false' }, required: false
            }],
          },
          { model: db.teacher_info },
          { model: db.teacher_training_detail }
        ],
        distinct: true,
      }, { rows: false })
      return res.status(200).json({ data: teacherList, message: CNST.SUCCESS })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  },
  updateStaffHiringFormDetail: async (req, res, next) => {
    let transaction = "";
    try {
      var { type, staff_detail_id, teacher_id } = req.body, result = ""

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
}