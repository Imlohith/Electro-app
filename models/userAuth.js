const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema;

const userAuth = new Schema({
   username: {
       type: String
   },
    socialid: {
       type: Number
   },
   email: {
       type: String,
       require: true
   },
   password: {
       type: String,
       required: true
   }    
})

userAuth.methods.excryptPass = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
}
userAuth.methods.validpass = (password) => {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userAuth)