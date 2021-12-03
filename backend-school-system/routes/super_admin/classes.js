const router = require('express-promise-router')();
const { validateBody, schemas } = require('../../helper/routeHelpers');
const classController = require('../../controller/super_admin/classes');
router.route('/create')
    .post(validateBody(schemas.addClassSchema), classController.addClass);

module.exports = router;