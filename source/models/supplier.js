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
        Category: {
            type: String,
            required: true,
            trim: true
        }
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