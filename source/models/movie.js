const mongoose = require ('mongoose')
const validator = require ('validator')

const Movie = mongoose.model('Movies', {
    Name: {
        type: String,
        required: true,
        trim: true
    },
    Runtime: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(!validator.isNumeric(value)){
                throw new Error('The runtime must not have letters in it')
            }
        }
    },
    Category: {
        type: String,
        required: true,
        trim: true
    },
    Supplier: {
        type: String,
        required: true,
        trim: true
    },
    InStock: {
        type: Boolean,
        default: true
    },
    Remaining: {
        type: Number,
        default: 5,
        validate(value) {
            if(value < 0) {
                throw new Error('We cannot have negative movies in stock')
            }
        }
    },
    Rented: {
        type: Number,
        default: 5,
        validate(value) {
            if(value < 0) {
                throw new Error('We cannot have a negative number of movies rented out')
            }
        }
    },
    Bought: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('We cannot have a negative number of bought movies')
            }
        }
    }
})

module.exports = Movie