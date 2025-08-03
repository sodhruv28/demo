const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(
    {
      usernameField: "login", // <- use a generic 'login' field
      passwordField: "password",
    },
    (login, password, done) => {
      // Look for either a matching username OR email
      User.findOne({ $or: [{ username: login }, { email: login }] })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "Incorrect username or email" });
          }

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return done(err);
            if (!isMatch) {
              return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
          });
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

// Serialize & Deserialize
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});
