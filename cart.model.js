const { Mongoose } = require("mongoose")

var mongoose = require('mongoose')
const CartSchema = new mongoose.Schema({
       productName: String,
       unitPrice:Number,
       availableQuantity: Number,
       orderQuantity: Number,
       totalprice:Number
})
var Cart = mongoose.model('cart',CartSchema)
module.exports = Cart