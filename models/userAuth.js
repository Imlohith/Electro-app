const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userAuth = new Schema({
   username: {
       type: String,
       required: true
   },
    socialid: {
       type: Number,
       require: true
   },
   email: {
       type: String,
       require: true
   }    
})

module.exports = mongoose.model('User', userAuth)