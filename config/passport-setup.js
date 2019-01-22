const passport = require('passport')
const FacebooStratagy =  require('passport-facebook')

//models
const User = require('../models/userAuth')

const keys = require('../config/keys')

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
    new FacebooStratagy({
        clientID: keys.facebook.clientID,
        clientSecret: keys.facebook.clientSecrect,
        callbackURL: '/auth/facebook/redirect',
        profileFields: ['id', 'displayName', 'photos', 'email', 'gender']
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        User.findOne({socialid: profile.id})
        .then((currentUser) => {
            if(currentUser) {
               console.log('user alredy exixts')
               done(null, currentUser)              
            } else {
                const user = new User({
                    username: profile.displayName,
                    socialid: profile.id,
                    email: profile._json.email
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

