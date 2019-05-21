const mongoose = require ('mongoose')
const validator = require ('validator')

const supplierSchema = new mongoose.Schema({
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


// function on the supplier Schema to find a given supplier by their name

supplierSchema.statics.findSupplier = async (Name) => {
    const supplier = await Supplier.findOne({ Name })

    if (!supplier) {
        throw new Error('Unable to find supplier')
    }

    return supplier
}

const Supplier = mongoose.model('Supplier',supplierSchema)

module.exports = Supplier
