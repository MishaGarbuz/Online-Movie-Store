const mongoose = require ('mongoose')
const validator = require ('validator')

const Order = mongoose.model('Task', {
    Amount: {
        type: Number,
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
})

module.exports = Order