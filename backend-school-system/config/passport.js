const passport = require("passport");
const JtwStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const FacebookTokenStrategy = require("passport-facebook-token");
const CNST = require("./constant");
const db = require("../models");

//JWT STRATEGY
passport.use(
  new JtwStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: process.env.JWT_SECRET
    },
    async (payload, done) => {
      try {
        //Find the user specified in token
        const user = await db.users.findOne({ where: { id: payload.sub, has_deleted: 'false' } });

        //If user does not exist, handle it
        if (!user) {
          return done({ message: CNST.ACCOUNT_DELETE_MSG }, false);
        }
        //Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

//LOCAL STRATEGY
passport.use(new LocalStrategy({ usernameField: "email" },
  async (email, password, done) => {
    try {
      //Find the user given the email
      const user = await db.users.findOne({
        where: { email, has_deleted: "false" },
        attributes: {
          exclude: ["Password", "reset_password_token", "method", "social_id"]
        }
        // include: [
        //     { model: db.users_role, as: "role" }
        // ]
      });
      //If not, handle it
      if (!user) {
        return done({ message: CNST.ACCOUNT_NOT_EXIST }, false);
      }


      // NEED to undow when commit remove the true and place the code on line 58-61
      //Check if the password is correct
      const isMatch = true;
      //   db.users.prototype.validatepassword(
      //   password,
      //   user.password
      // ); 
      //If not, handle it
      if (!isMatch) {
        return done({ message: CNST.INVALID_CREDENTIAL }, false);
      }

      // Check user has approved and active from Admin
      if (user.approved && user.active) {
        //Otherwise return the user
        done(null, user);
      }
      else {
        // Throw error
        return done({ message: CNST.ACCOUNT_NOT_APPROVED }, false);
      }

    } catch (error) {
      done(error, false);
    }
  }
)
);

//FACEBOOK STRATEGY
passport.use(
  "facebookToken",
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        //Check user already exist
        const existUser = await db.users.findOne({
          where: { email: profile.emails[0].value, has_deleted: "false" }
        });
        //If email already exist but social id not
        if (existUser && !existUser.social_id) {
          return done(null, { error: "Email already exist" });
        }
        //If exist, handle it
        if (existUser) {
          return done(null, existUser);
        }
        //Create new user
        const user = {
          email: profile.emails[0].value,
          method: profile.provider,
          first_name: `${profile._json.first_name}`,
          last_name: `${profile._json.last_name}`,
          social_id: profile.id,
          role_id: 3
        };
        const createdUser = await db.users.create(user);
        //Other wise return the user
        done(null, createdUser);
      } catch (error) {
        return done(error, false, error.message);
      }
    }
  )
);

// GOOGLE PLUS STRATEGY
passport.use(
  "googleToken",
  new GooglePlusTokenStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        //Check user already exist
        const existUser = await db.users.findOne({
          where: { email: profile.emails[0].value, has_deleted: "false" }
        });

        //If email already exist but social id not
        if (existUser && !existUser.social_id) {
          return done(null, { error: CNST.ACCOUNT_WITH_EMAIL_EXIST });
        }
        //If exist, handle it
        if (existUser) {
          return done(null, existUser);
        }
        //Create new user
        const user = {
          email: profile.emails[0].value,
          method: profile.provider,
          first_name: `${profile._json.name.givenName}`,
          last_name: `${profile._json.name.familyName}`,
          social_id: profile.id,
          role_id: 3
        };
        const createdUser = await db.users.create(user);
        //Other wise return the user
        done(null, createdUser);
      } catch (error) {
        return done(error, false, error.message);
      }
    }
  )
);
