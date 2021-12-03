const router = require('express-promise-router')();
const supportController = require('../../controller/admin/support');

router.route('/list')
    .get(supportController.list);

router.route('/reply')
    .post(supportController.reply);

router.route('/delete')
    .delete(supportController.delete);

router.route('/sort_by_date_range')
    .get(supportController.sortByDateRange)
module.exports = router;