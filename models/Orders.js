const mongoose = require('mongoose')
const  uuid = require ('uuid')

const ordersSchema = new mongoose.Schema({
    orderid:{
        type: String, 
        default: function genUUID() {
            return uuid.v4()}
    },
    custname: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    account: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    amount: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Order', ordersSchema)