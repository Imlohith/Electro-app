const passport = require('passport')
const LocalStratery = require('passport-local').Strategy;

const User = require('../models/userAuth')

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


passport.use('local-login', new LocalStratery({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    User.findOne({email: email})
    .then((err, user) => {
        if(err) {
            return done(null, err)
        } 
        if(!user) {
            console.log(user)
            return done(null, false)
        }
        if(!user.validpass(password)){
            return done(null, false)
        }
        if(user) {
            done(null, user)
        }
    })
    .catch(err => {
        throw err
    }) 
}))

