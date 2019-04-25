const mongoose = require ('mongoose')
const validator = require ('validator')

const Supplier = mongoose.model('Supplier', {
    Name: {
        type: String,
        required: true,
        trim: true
    },
    Address: {
        type: String,
        required: true,
        trim: true        
    },
    Categories: [{
        Category1: String,
        Category2: String,
        Category3: String
    }],
    PhoneNumber: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isMobilePhone(value,'en-AU')) {
                throw new Error('Must be an Australian mobile phone number')
            }
        }
    }
})

module.exports = Supplier