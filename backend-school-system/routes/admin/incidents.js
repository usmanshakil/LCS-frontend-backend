const router = require('express-promise-router')();
const { validateBody, schemas } = require('../../helper/routeHelpers')
//import controller
const IncidentController = require('../../controller/admin/incidents');

const multer = require('multer');
const upload = multer()
//Routes
router.route('/list')
    .get(IncidentController.list);

router.route('/view')
    .get(IncidentController.getbyid);

router.route('/search')
.get(IncidentController.search);

router.route('/classlist')
.get(IncidentController.classList);

router.route('/add')
    .post(validateBody(schemas.addIncidentSchema), IncidentController.create);

router.route('/edit')
    .post(validateBody(schemas.updateIncidentSchema), IncidentController.update);

router.route('/delete')
    .delete(IncidentController.delete);

router.route('/uploadImages')
    .post(upload.array('files'), IncidentController.uploadImages)

module.exports = router;