const router = require('express').Router();

const authCheck = (req, res, next) => {
    if(!req.user) {
       res.redirect('/auth/login')
    } else {
        next()
    }
}

router.get('/', authCheck,  (req, res, next) => {
    // res.send('welcome to profile page' + req.user.username)
    res.render('profile', { user:  req.user, message: req.flash('back') })
})

module.exports = router