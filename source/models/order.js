const mongoose = require ('mongoose')
const validator = require ('validator')

const orderSchema = new mongoose.Schema({
    Movie: {
        type: String,
        trim: true,
        required: true
    },
    Completed: {
        type: Boolean,
        default: false
    },
    Owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    Quantity: {
        type: Number,
        require: true,
        default: 1
    }
}, {
    timestamps: true
})
const Order = mongoose.model('Order', orderSchema)

module.exports = Order