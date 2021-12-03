const router = require('express-promise-router')();
const { validateBody, schemas } = require('../../helper/routeHelpers')
//import controller
const IncidentController = require('../../controller/admin/incidentTypes');


//Routes
router.route('/list')
    .get(IncidentController.list);

router.route('/view')
    .get(IncidentController.getbyid);

router.route('/add')
    .post(validateBody(schemas.addIncidentTypeSchema), IncidentController.create);

router.route('/edit')
    .post(validateBody(schemas.addIncidentTypeSchema), IncidentController.update);

router.route('/delete')
    .delete(IncidentController.delete);

module.exports = router;