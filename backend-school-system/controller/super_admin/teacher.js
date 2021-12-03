const db = require('../../models');
const CNST = require('../../config/constant');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/web_config.json')[env];
module.exports = {
    createTeacher: async (req, res, next) => {
        try {
            let { first_name, last_name, email, password } = req.value.body;
            //Add role for teacher
            req.value.body.role_id = CNST.ROLES.TEACHER;
            const hasTeacherExist = await db.users.findOne({ where: { email } });
            if (hasTeacherExist) {
                return res.status(400).json({ message: CNST.ACCOUNT_WITH_EMAIL_EXIST })
            }

            //Send Email to super admin
            const userData = [{
                name: `${first_name} ${last_name}`,
                email: email,
                contactEmail: config.contact_email,
                logo: config.email_logo
            }]
            const result = await sendEmail('signup', userData);
            //Create new user
            const teacher = await db.users.create(req.value.body)
            //Create role
            const userRole = { user_id: teacher.id, role_id: teacher.role_id }
            const role = await db.users_role.create(userRole);
            return res.status(200).json({ message: CNST.USER_CREATED_SUCCESS })
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    },
    addTeacherInfo: async (req, res, next) => {
        try {
            req.value.body.user_id = req.user.id;
            const teacherInfoRes = db.teacher_info.create(req.value.body);
            return res.status(200).json({ message: CNST.SUCCESS })
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    },
    studentList: async (req, res, next) => {
        try {
            const students = await db.childs.findAll();
            return res.status(200).json({ data: students, message: CNST.SUCCESS })
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }
}