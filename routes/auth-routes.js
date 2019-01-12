const router = require('express').Router()
const passport = require('passport')

router.get('/login', (req, res, next) => {
   res.render('login')
})

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