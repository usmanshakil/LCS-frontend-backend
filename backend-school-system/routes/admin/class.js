const router = require('express-promise-router')();
const {validateBody,schemas} = require('../../helper/routeHelpers')
//import controller
const classController = require('../../controller/admin/class');

//Routes
router.route('/list')
    .get(classController.list);

router.route('/create')
    .post(validateBody(schemas.addClassSchema),classController.add);

router.route('/update')
    .post(validateBody(schemas.updateClassSchema), classController.update);

router.route('/search')
    .get(classController.search)
router.route('/delete')
    .delete(classController.delete);
    
module.exports = router;