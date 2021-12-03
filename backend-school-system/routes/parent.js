const router = require('express-promise-router')();
const { validateBody, schemas } = require('../helper/routeHelpers')
const parent = require('../controller/parent');
const passport = require('passport')
const passportJWT = passport.authenticate('jwt', { session: false })

router.route('/profile')
    .get(passportJWT, parent.getProfile);

router.route('/update')
    .post(passportJWT, parent.update);

router.route('/child/add')
    .post(passportJWT, parent.child.add)

router.route('/child/update')
    .post(parent.child.update)

router.route('/child/list')
    .get(passportJWT, parent.child.list)

router.route('/child/delete')
    .delete(parent.child.delete)

router.route('/child/renew_admission')
    .post(passportJWT, parent.child.renew_admission)

module.exports = router;