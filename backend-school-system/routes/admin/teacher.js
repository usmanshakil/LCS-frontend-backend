const router = require('express-promise-router')();
const { validateBody, schemas } = require('../../helper/routeHelpers')
//import controller
const teacherController = require('../../controller/admin/teacher');

//Routes
router.route('/list')
    .get(teacherController.list);

router.route('/all')
    .get(teacherController.AllTeacherList);

router.route('/add')
    .post(validateBody(schemas.addTeacherSchema), teacherController.createTeacher);

router.route('/update')
    .post(teacherController.update);

router.route('/search')
    .get(teacherController.search)

router.route('/delete')
    .delete(teacherController.delete);

router.route('/view_teacher/:teacher_id')
    .get(teacherController.teacherDetailById);

router.route('/view_staff_hiring_form/:teacher_id')
    .get(teacherController.viewStaffHiringForm)

router.route('/update_staff_hire_form')
    .get(teacherController.updateStaffHiringFormDetail)

module.exports = router;