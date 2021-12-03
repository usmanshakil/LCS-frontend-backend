const db = require("../../models");
const CNST = require("../../config/constant");
const { imageUpload } = require("../../helper/s3upload");
const { sendEmail } = require('../../helper/email');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/web_config.json')[env];
const { getUserRole } = require('../../helper/helper');
module.exports = {
  getProfile: async (req, res, next) => {
    try {
      const userInfo = await db.users.findOne({ where: { id: req.user.id } });
      res.status(200).json({ data: userInfo, message: CNST.DATA_LOAD_SUCCESS });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  update: async (req, res, next) => {
    try {
      let userInfo = req.body;
      let userID = req.user.id;
      let before, after;

      before = await db.users.findOne({ where: { id: userID }, attributes: { exclude: ['last_login', 'createdAt', 'updatedAt'] } });
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
      db.users.update(userInfo, { where: { id: userID } })
        .then(() => {
          return db.users.findOne({ where: { id: userID }, attributes: { exclude: ['last_login', 'createdAt', 'updatedAt'] } }).then(user => {
            after = user;
            //Compare before and after data to check the changes and then send updates to admin
            var updatedInfo = [];
            for (let key in before._previousDataValues) {
              // console.log(key);
              if (after[key] !== before[key]) {
                var obj = {
                  key: [key],
                  before: before[key] === "0" ? "checked" : before[key] === "1" ? "unchecked" : before[key],
                  after: after[key] === "0" ? "checked" : after[key] === "1" ? "unchecked" : after[key]
                }
                updatedInfo.push(obj);
              }
            }

            let emailData = [{
              tableName: "parent profile",
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
            res.status(200).json({ data: user, message: CNST.USER_UPDATE_SUCCESS });
          });
        });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};
