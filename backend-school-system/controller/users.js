const db = require("../models");
const JWT = require("jsonwebtoken");
const CNST = require("../config/constant");
const { sendEmail } = require("../helper/email");
const { imageUpload, documentUpload } = require("../helper/s3upload");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/web_config.json")[env];
signToken = (user) => {
  // Set permissions
  // switch(user){
  //     case 1:
  //         permissions = ['SUPER_ADMIN']
  //         break;
  //     case 2:
  //         permissions:['ADMIN']
  //         break;
  //     case 3:
  //         permissions:['USER']
  //         break;
  //     case 4:
  //         permissions:['TEACHER']
  //         break;
  // }
  return JWT.sign(
    {
      iss: "beyondroot",
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
      user_role: user.role_id,
      // permissions
    },
    process.env.JWT_SECRET
  );
};
module.exports = {
  signUp: async (req, res, next) => {
    try {
      let { email, first_name, last_name, signature } = req.value.body;

      //Check if there is a user with the same email
      const foundUser = await db.users.findOne({
        where: { email, has_deleted: "false" },
      });
      if (foundUser) {
        return res.status(400).json({ message: CNST.ACCOUNT_WITH_EMAIL_EXIST });
      }

      //Set signature value blank while saving user
      //req.value.body.signature = "";
      req.value.body.active = 1;
      req.value.body.initial_role_id = req.value.body.role_id;
      //Create new user
      const user = await db.users.create(req.value.body);

      //Upload parent signature
      // if (signature) {
      //   const fileName = await imageUpload(signature, user.id);
      //   //Update signature value in user object
      //   user.signature = fileName;
      //   db.users.update({ signature: fileName }, { where: { id: user.id } });
      // }

      //Create role
      const userRole = { user_id: user.id, role_id: user.role_id };
      const role = await db.users_role.create(userRole);

      //Send Email to super admin
      const emailData = [
        {
          name: `${first_name} ${last_name}`,
          userEmail: email,
          email: config.email,
          superAdminName: config.name,
          hasSendToAdmin: true,
          contactEmail: config.contact_email,
          webSiteLink: config.web_site_url + "users",
          role:
            user.role_id === 3 ? "Parent" : user.role_id === 4 ? "Teacher" : "",
          privacyPolicyLink: config.web_site_url + "privacy-policy",
        },
        {
          name: `${first_name} ${last_name}`,
          email: email,
          superAdminName: config.name,
          hasSendToAdmin: false,
          contactEmail: config.contact_email,
          webSiteLink: config.web_site_url + "users",
          privacyPolicyLink: config.web_site_url + "privacy-policy",
        },
      ];
      const emailResult = sendEmail("signup", emailData);

      //Generate token
      // const token = await signToken(user);
      // const tokenWithBearer = `Bearer ${token}`;
      // delete user.password
      // return res.status(200).json({ data: user, token });
      return res.status(200).json({ message: CNST.ACCOUNT_UNDER_APPROVED });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  signIn: async (req, res, next) => {
    try {
      let token = await signToken(req.user);
      console.log("token")
      return res.status(200).json({ data: req.user, token });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },
  profile: async (req, res, next) => {
    try {
      const id = req.user.id;
      const user = await db.users.findOne({ where: { id: id } });
      return res
        .status(200)
        .json({ data: user, message: CNST.DATA_LOAD_SUCCESS });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },
  facebookOauth: async (req, res, next) => {
    const token = await signToken(req.user);
    return res.status(200).json({ data: req.user, token });
  },
  googleOauth: async (req, res, next) => {
    if (req.user.error) {
      return res.status(400).json({ message: req.user.error });
    }
    const token = await signToken(req.user);
    return res.status(200).json({ data: req.user, token });
  },
  forgotPassword: async (req, res, next) => {
    try {
      //Find user in db
      const user = await db.users.findOne({
        where: { email: req.value.body.email },
      });
      if (!user) {
        return res.status(400).json({ message: CNST.ACCOUNT_NOT_EXIST });
      }
      const forgotToken = JWT.sign(
        {
          iss: "beyondroot",
          sub: user.id,
          iat: new Date().getTime(), // current time
          expiry_date: new Date().setHours(new Date().getHours() + 2),
        },
        process.env.JWT_SECRET
      );
      //Update user
      const userUpdate = await db.users.update(
        { reset_password_token: forgotToken },
        { where: { id: user.id } }
      );
      //Send Email to super admin
      const userData = [
        {
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          signature: forgotToken,
          passwordResetAddress:
            config.web_site_url + config.forgot_password_path + forgotToken,
          contactEmail: config.contact_email,
          logo: config.email_logo,
        },
      ];
      const result = sendEmail("forgot_password", userData);
      return res.status(200).json({ message: CNST.FORGOT_EMAIL_SUCCESS });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      let { signature, new_password } = req.value.body;
      //Get reset password token from db
      const user = db.users.findOne({
        where: { reset_password_token: signature },
      });
      if (!user) {
        return res.status(400).json({ message: CNST.INVALID_REQUEST });
      }
      var decodedData = JWT.verify(signature, process.env.JWT_SECRET);
      const currentDate = new Date().getTime();
      if (currentDate > decodedData.expiry_date) {
        return res
          .status(400)
          .json({ message: CNST.RESET_PASSWORD_LINK_EXPIRED });
      }
      let userData = { password: new_password };
      const updateUser = db.users.update(userData, {
        where: { id: decodedData.sub },
      });
      return res.status(200).json({ message: CNST.PASSWORD_RESET_SUCCESS });
      // console.log(decoded);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  secret: async (req, res, next) => {
    return res.status(200).json({ secret: "resource" });
  },
  upload: async (req, res, next) => {
    documentUpload(req)
      .then((files) => {
        console.log("files value === " + files);
        return res.status(200).json({ files });
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
  },
  // download: async (req, res) => {

  //   res.download(req.params['filePath'], req.params['fileName'], function (err) {
  //     console.log('download callback called');
  //     if (err) {
  //       console.log('something went wrong');
  //     }

  //   });
  // }
};
