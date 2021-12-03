const router = require('express-promise-router')();
const { validateBody, schemas } = require('../../helper/routeHelpers')
//import controller
const LocationsController = require('../../controller/admin/locations');


//Routes
router.route('/list')
    .get(LocationsController.list);

router.route('/view')
    .get(LocationsController.getbyid);

router.route('/add')
    .post(validateBody(schemas.addLocationSchema), LocationsController.create);

router.route('/edit')
    .post(validateBody(schemas.addLocationSchema), LocationsController.update);

router.route('/delete')
    .delete(LocationsController.delete);

module.exports = router;