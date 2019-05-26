const mongoose = require ('mongoose')
const validator = require ('validator')

const orderSchema = new mongoose.Schema({
    Description: {
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
    Movie: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Movie'
    }
}, {
    timestamps: true
})
const Order = mongoose.model('Order', orderSchema)

module.exports = Order