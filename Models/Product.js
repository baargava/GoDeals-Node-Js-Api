const mongoose = require('mongoose');
const category = require('./Category');

const ProductSchema = new mongoose.Schema({

    title: String,
    image: String,
    price: Number,
    description: String,
    created_date: {
        type: Date,
        default: Date.now
    },
    categoty: {
        type: mongoose.Schema.Types.ObjectId, ref: 'category'
    }
})

module.exports = mongoose.model('Products', ProductSchema)