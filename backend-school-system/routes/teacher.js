const router = require('express-promise-router')();
const { validateBody, schemas } = require('../helper/routeHelpers')
const teacher = require('../controller/teacher');
const passport = require('passport')
const passportJWT = passport.authenticate('jwt', { session: false })

router.route('/info')
    .get(teacher.getInfo);
router.route('/update')
    .post(teacher.updateInfo);

router.route('/update-profile')
    .post(teacher.updateProfile);

router.route('/class/list')
    .get(teacher.classList);

router.route('/student/list')
    .get(teacher.studentList);

router.route('/add_staff_hire_form')
    .post(teacher.addStaffHiringFormDetail);

router.route('/update_staff_hire_form')
    .post(teacher.updateStaffHiringFormDetail);

router.route('/view_staff_hire_form')
    .get(teacher.viewStaffHiringFormDetail);

module.exports = router;