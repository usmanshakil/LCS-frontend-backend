const router = require('express-promise-router')();
const ancmntController = require('../../controller/admin/annoucements');
const { validateBody, schemas } = require('../../helper/routeHelpers');

router.route('/list')
    .get(ancmntController.list);

router.route('/delete')
    .delete(ancmntController.delete);

router.route('/add')
    .post(validateBody(schemas.addAnnouncementSchema),ancmntController.add);

router.route('/update')
    .post(validateBody(schemas.updateAnnouncementSchema),ancmntController.update);

router.route('/update_status/:id')
    .patch(ancmntController.setActive);

router.route('/active')
    .get(ancmntController.active)
module.exports = router;