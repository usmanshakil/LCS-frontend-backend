const router = require('express-promise-router')();
const { validateBody, schemas } = require('../../helper/routeHelpers')
//import controller
const userController = require('../../controller/admin/user');

//Routes
router.route('/list')
    .get(userController.list);

router.route('/view')
    .get(userController.userById)
router.route('/update')
    .post(userController.update);

router.route('/search')
    .get(userController.search);

router.route('/update_status/:id')
    .patch(userController.updateActiveStatus)

router.route('/delete')
    .delete(userController.delete);
module.exports = router;