const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/userAuth')

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    // asynchronous
    // User.findOne wont fire unless data is sent back
         // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email': email }, function (err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (!user) {
                return done(null, false, req.flash('userExits', 'no user exits with this email'));
            }
            if (!user.validPass(password)) {
                return done(null, false, req.flash('fail', 'incorrect password'));
            }
            return done(null, user)

        });

}));





