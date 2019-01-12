const passport = require('passport')
const GoogleStratagy = require('passport-google-oauth20').Strategy;

//models
const User = require('../models/userAuth')

const keys = require('./keys')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then((data) => {
       done(null, data)
    })
    .catch(err => {
       throw err;
    })
})

passport.use(
    new GoogleStratagy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect',
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        User.findOne({socialid: profile.id })
        .then((currentUser) => {
            if(currentUser) {
               console.log('user alredy exixts')
               done(null, currentUser)              
            } else {
                const user = new User({
                    username: profile.displayName,
                    socialid: profile.id,
                    email: profile.emails[0].value
                })
                user.save()
                .then((result) => {
                    console.log(result)
                    done(null, user)
                })
                .catch(err => {
                    throw err
                })
            }
        })
        .catch(err => {
            throw err
        })
    })
)

