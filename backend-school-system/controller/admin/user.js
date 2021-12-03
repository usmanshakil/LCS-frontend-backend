const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const db = require("../../models");
const { imageUpload } = require("../../helper/s3upload");
const CNST = require("../../config/constant");
const { sendEmail } = require("../../helper/email");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/web_config.json")[env];
module.exports = {
  list: async (req, res, next) => {
    try {
      var page_number =
          parseInt(req.query.page_number) || CNST.DEFAULT_PAGE_NUMBER,
        page_size = parseInt(req.query.page_size) || CNST.DEFAULT_PAGE_SIZE,
        page_number =
          page_number <= 1 ? 0 : page_number * page_size - page_size,
        order_by_column = req.query.column || "",
        order_type = req.query.order || "ASC",
        status = req.query.status || "";
      var whereCondition = { has_deleted: "false" };
      if (status !== "All" || "") {
        if (status === "Active" || status === "Inactive") {
          whereCondition.active = status.toLowerCase() === "active" ? 1 : 0;
        } else {
          whereCondition.approved = status.toLowerCase() === "approved" ? 1 : 0;
        }
      }
      let order = [];
      order_by_column
        ? order_by_column === "role"
          ? order.push([db.role, order_by_column, order_type])
          : order.push([order_by_column, order_type])
        : order.push(["id", "DESC"]);
      const usersList = await db.users.findAndCountAll(
        {
          where: whereCondition,
          attributes: [
            "id",
            "first_name",
            "last_name",
            "email",
            "phone",
            "cellphone",
            "approved",
            "email_confirmed",
            "active",
            "has_received_text",
            "signature",
            "created_at",
            "last_login",
            "role_id",
            "initial_role_id",
            [db.sequelize.col("role.role"), "role"],
          ],
          include: [{ model: db.role, attributes: [] }],
          order: order,
          distinct: true,
          offset: page_number,
          limit: page_size,
          raw: true,
        },
        { rows: false }
      );
      return res.status(200).json({
        data: usersList.rows,
        total_records: usersList.count,
        message: CNST.SUCCESS,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  userById: async (req, res, next) => {
    try {
      const id = req.query.id;
      if (!id) {
        return res.status(400).json({ message: CNST.USER_ID_REQUIRED });
      }
      const usersList = await db.users.findOne(
        {
          where: { has_deleted: "false", id },
          attributes: [
            "id",
            "first_name",
            "last_name",
            "email",
            "phone",
            "cellphone",
            "approved",
            "email_confirmed",
            "active",
            "has_received_text",
            "signature",
            "created_at",
            "last_login",
            "role_id",
            "initial_role_id",
            "comment",
            [db.sequelize.col("role.role"), "role"],
          ],

          include: [
            {
              model: db.role,
              attributes: [],
              required: true,
            },
          ],

          raw: true,
        },
        { rows: false }
      );
      return res.status(200).json({ data: usersList, message: CNST.SUCCESS });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  update: async (req, res, next) => {
    try {
      let userInfo = req.body;
      let userID = userInfo.id;
      //Upload parent signature
      // if (userInfo.signature.indexOf("https") === -1) {
      //   const fileName = await imageUpload(userInfo.signature, userID);
      //   //Update signature value in user object
      //   userInfo.signature = fileName;
      // }
      //Check password object contain value or not
      if (!userInfo.password) {
        delete userInfo.password;
      }
      //Check signature object contain value or not
      if (!userInfo.signature) {
        delete userInfo.signature;
      }
      // Check user account already approved or not
      const userData = await db.users.findOne({ where: { id: userID } });
      if (userData && !userData.approved && userInfo.approved) {
        // Notify user for account approval via email.
        const emailContent = [
          {
            name: `${userData.first_name} ${userData.last_name}`,
            email: userData.email,
            webLoginUrl: config.web_site_url + "login",
            logo: config.email_logo,
          },
        ];
        const result = await sendEmail("account_approval", emailContent);
      }
      db.users
        .update(userInfo, { where: { id: userID } })
        .then(() => {
          //Update role
          let role = { role_id: userInfo.role_id };
          db.users_role
            .update(role, { where: { user_id: userID } })
            .then((result) => {
              return res
                .status(200)
                .json({ message: CNST.USER_UPDATE_SUCCESS });
            })
            .catch((error) => {
              return res.status(400).json({ message: error.message });
            });
        })
        .catch((error) => {
          return res.status(400).json({ message: error.message });
        });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  updateActiveStatus: async (req, res, next) => {
    try {
      const id = req.params.id;
      const active = req.body.active || false;
      if (!id) {
        return res.status(400).json({ message: CNST.ID_REQUIRED });
      }
      db.users
        .update({ active: active }, { where: { id: id } })
        .then((response) => {
          // if (active) {
          //   db.users.findOne({ where: { id: id } }).then(userData => {
          //     const emailContent = [
          //       {
          //         name: `${userData.first_name} ${userData.last_name}`,
          //         email: userData.email,
          //         webLoginUrl: config.web_site_url + 'login'
          //       }
          //     ];
          //     const result = sendEmail("account_approval", emailContent);
          //   })
          // }

          return res.status(200).json({
            message: active ? CNST.ACTIVE_SUCCESS : CNST.INACTIVE_SUCCESS,
          });
        })
        .catch((error) => {
          return res.status(400).json({ message: error.message });
        });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  search: async (req, res, next) => {
    try {
      const { searchQuery, status } = req.query;
      var page_number =
          parseInt(req.query.page_number) || CNST.DEFAULT_PAGE_NUMBER,
        page_size = parseInt(req.query.page_size) || CNST.DEFAULT_PAGE_SIZE,
        page_number =
          page_number <= 1 ? 0 : page_number * page_size - page_size,
        order_by_column = req.query.column || "first_name",
        order_type = req.query.order || "ASC";
      var whereCondition = {
        has_deleted: "false",
        [Op.or]: [
          {
            first_name: { [Op.like]: `%${searchQuery}%` },
          },
          {
            last_name: { [Op.like]: `%${searchQuery}%` },
          },
          {
            phone: { [Op.like]: `%${searchQuery}%` },
          },
          {
            email: { [Op.like]: `%${searchQuery}%` },
          },
          // {'$role.role$' : `%${searchQuery}%`},
        ],
      };
      if (status !== "All" && status !== "") {
        whereCondition.active = status.toLowerCase() === "active" ? 1 : 0;
      }
      let order = [];
      order_by_column
        ? order_by_column === "role"
          ? order.push([db.role, order_by_column, order_type])
          : order.push([order_by_column, order_type])
        : order.push(["id", "DESC"]);
      const searchData = await db.users.findAndCountAll(
        {
          where: whereCondition,
          attributes: [
            "id",
            "first_name",
            "last_name",
            "email",
            "phone",
            "cellphone",
            "approved",
            "email_confirmed",
            "active",
            "has_received_text",
            "signature",
            "created_at",
            "last_login",
            "role_id",
            [db.sequelize.col("role.role"), "role"],
          ],
          include: [{ model: db.role, attributes: [] }],
          order: order,
          raw: true,
          offset: page_number,
          limit: page_size,
        },
        { rows: false }
      );
      return res.status(200).json({
        data: searchData.rows,
        total_records: searchData.count,
        message: CNST.SUCCESS,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  delete: async (req, res, next) => {
    try {
      const id = req.query;
      const userObj = { has_deleted: "true" };
      const deleteUser = await db.users.update(userObj, { where: id });
      const deleteChild = await db.childs.update(userObj, { where: id });

      return res.status(200).json({ message: CNST.USER_DELETE_SUCCESS });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
