const router = require("express-promise-router")();
const { validateBody } = require("../../helper/routeHelpers");
//import controller
const studentController = require("../../controller/admin/student");

//Routes
router.route("/list").get(studentController.list);

// studentChecklist started
router.route("/getStudenthecklist").get(studentController.get_student_checklist); 
// studentCHecklist ended
 
router
  .route("/multiSelectList")
  .get(studentController.studentListForMultiSelect);
router.route("/get_one").get(studentController.get_one);
router.route("/update").post(studentController.update);

router.route("/renewal").get(studentController.renewalOrExpiredChilds);

router.route("/search").get(studentController.searchStudent);

router.route("/delete").delete(studentController.delete);
module.exports = router; 