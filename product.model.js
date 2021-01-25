const { Mongoose } = require("mongoose")

var mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
    name:String,
            imgLink: String,
            price: Number,
            totalQuantity: Number,
            details: String
})
var Product = mongoose.model('product',ProductSchema)
module.exports = Product