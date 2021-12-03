const router = require('express-promise-router')();
const { validateBody, schemas } = require('../../helper/routeHelpers');
const teacherController = require('../../controller/super_admin/teacher');
router.route('/create')
    .post(validateBody(schemas.addTeacherSchema), teacherController.createTeacher);

router.route('/add_info')
    .post(teacherController.addTeacherInfo);

module.exports = router;