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
            return done(null, err, req.flash('unkonown', 'there was an error, please try after sometime'))
        } 
        if(!user) {
            console.log(user)
            return done(null, false, req.flash('NotExists', 'no user exixts'))
        }
        if(!user.validpass(password)){
            return done(null, false, req.flash('passFail', 'password not matches'))
        }
        if(user) {
            done(null, user, req.flash('success', 'login success'))
        }
    })
    .catch(err => {
        throw err
    }) 
}))

