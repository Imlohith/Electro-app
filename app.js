const express = require('express')
const bodyParser = require('body-parser')
const facebookStratagy = require('./config/passport-setup')
const googleStratagy = require('./config/google-setup')
const localStratagy = require('./config/local-setup')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const keys = require('./config/keys')
const passport = require('passport')

//imports 
const authRoutes = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile-routes')

const app = express();

//templateengine 
app.set('view engine', 'ejs')

//use middleware 
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use(cookieSession({
  maxAge: 10 * 10 * 60 * 1000,
  keys: [keys.sessionCookie.cookie]
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//basic routes 
app.get('/', (req, res, next) => {
  res.render('index')
})

mongoose.connect(`
mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-ppdu9.mongodb.net/${process.env.MONGO_DB}?retryWrites=true
`)
  .then(() => {
    app.listen(4000, () => {
      console.log('Mongodb connnected')
      console.log(`App listening on port 4000`)
    })
  })
  .catch(err => {
     throw err
  })

