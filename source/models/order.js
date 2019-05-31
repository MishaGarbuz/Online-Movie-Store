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
    },
    ShippingMethod: {
        type: String,
        require: true,
    },
    ShippingAddress: {
        type: String,
        require: true,
    },
    Status: {
        type: String,
        trim: true,
        validate(value) {
            // if (value != "Submitted") {
            //     throw new Error ('The status of an order must be Submitted or Cancelled only')
            // }
            if (!validator.isIn(value,['Submitted','Cancelled'])) {
                throw new Error ('The status of an order must be Submitted or Cancelled only')
            }
        },
        default: 'Submitted'
    }
}, {
    timestamps: true
})
const Order = mongoose.model('Order', orderSchema)

module.exports = Order