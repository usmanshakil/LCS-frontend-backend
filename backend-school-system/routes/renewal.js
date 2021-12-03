const router = require('express-promise-router')();
const renewalController = require('../controller/renewal');


router.route('/')
    .get(renewalController.sendExpiredChildEmailToParent);
    
module.exports = router;