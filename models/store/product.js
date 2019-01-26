const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const product = new Schema({
   productName: {
       type: String,
       required: true
   },
   productImg: {
       type: String,
       required: true
   },
   productPrice: {
       type: Number,
       required: true
   },
   createdAt: {
       type: Date,
       required: true
   },
   updatedAt: {
        type: Date,
        required: true
   },
   specifications: [

   ]
})

module.exports = mongoose.model('Product', product)