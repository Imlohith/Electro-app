const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema;

const userAuth = new Schema({
   username: {
       type: String,
       required: true
   },
    socialid: {
       type: Number
   },
   email: {
       type: String,
       require: true
   },
   password: {
       type: String
   }    
})

userAuth.methods.excryptPass = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
}

userAuth.methods.validPass = function(password) {
    console.log(this.password)
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userAuth)