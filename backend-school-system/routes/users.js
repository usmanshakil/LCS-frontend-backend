var router = require('express-promise-router')();
const UsersController = require('../controller/users');
const userSupport = require('../controller/support');
const { validateBody, schemas } = require('../helper/routeHelpers');
const passport = require('passport');
const passportConf = require('../config/passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const passportSignIn = passport.authenticate('local', { session: false });
const passportFacebook = passport.authenticate('facebookToken', { session: false });
const passportGoogle = passport.authenticate('googleToken', { session: false });

router.route('/signup')
  .post(validateBody(schemas.signUpSchema), UsersController.signUp);

router.route('/signin')
  .post(validateBody(schemas.signInSchema), passportSignIn, UsersController.signIn);

router.route('/forgot-password')
  .post(validateBody(schemas.forgotPasswordSchema), UsersController.forgotPassword);

router.route('/reset-password')
  .post(validateBody(schemas.resetPasswordSchema), UsersController.resetPassword);

router.route('/oauth/facebook')
  .post(passportFacebook, UsersController.facebookOauth);

router.route('/oauth/google')
  .post(passportGoogle, UsersController.googleOauth);

router.route('/profile')
  .get(passportJWT, UsersController.profile);

router.route('/support')
  .post(validateBody(schemas.supportSchema), passportJWT, userSupport.support);

router.route('/upload')
  .post(passportJWT, UsersController.upload);

// router.route('/download')
//   .get(UsersController.download);

router.route('/secret')
  .get(passportJWT, UsersController.secret);

module.exports = router;
