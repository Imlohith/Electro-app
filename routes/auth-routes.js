const router = require('express').Router()
const passport = require('passport')

// router.post('/login', passport.authenticate('local.login', {
//     successRedirect: '/profile/', failureRedirect: '/auth/login/'
// }))

router.get('/login', (req, res, next) => {
    res.render('login')
})

router.get('/signup', (req, res, next) => {
    res.render('signup')
})

 // process the signup form
 router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/auth/signup', // redirect back to the signup page if there is an error
}));

// router.post('/login', passport.authenticate('local.login', {
//     successRedirect: '/profile',
//     failureRedirect: '/'
//   }));

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/')
})

router.get('/facebook', passport.authenticate('facebook'))

router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res, next) => {
    res.redirect('/profile/')
})

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

router.get('/google/redirect', passport.authenticate('google'), (req, res, next) => {
    res.redirect('/profile/')
})


module.exports = router;