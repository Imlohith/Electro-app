const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const store = new Schema({
   storeName = {
       type: String,
       required: true
   },
   StoreLogo: {
       type: String,
       required: true
   },
   address: [],
   CreatedAt: {
       type: Date,
   },
   products: [
     
   ]
})

module.exports = mongoose.model('Store', store)