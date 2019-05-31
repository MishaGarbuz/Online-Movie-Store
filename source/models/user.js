const mongoose = require ('mongoose')
const validator = require ('validator')
const bcrypt = require ('bcryptjs')
const jwt = require('jsonwebtoken')
const Order = require('./order')

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true
    },
    Email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        },
        unique: true
    },
    Age: {
        type: Number,
        default: 18,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    Password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain the word, password')
            }
        }
    },
    Admin: {
        type: Boolean,
        required: true,
    },
    Staff: {
        type: Boolean,
        required: true
    },
    Address: {
        type: String,
        required: true,
        trim: true
    },
    PhoneNumber: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isMobilePhone(value,'en-AU')) {
                throw new Error('Must be an Australian mobile phone number')
            }
        }
    },
    CreditCard: {
        type: String,
        // validate(value) {
        //     if(!validator.isCreditCard(value)) {
        //         throw new Error('Must be a valid credit card number')
        //     }
        // }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    loginStamp: [{
        time: {
            type: String
        }
    }],
    logoutStamp: [{
        time: {
            type: String
        }
    }],
}, {
    timestamps: true
})

userSchema.virtual('Orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'Owner'
})

// Function to search for user and then checked password against hashed passwored in DB

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.Password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() },';UV73yVT(56DP+' )
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (Email, Password) => {
    const user = await User.findOne({ Email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatchedPassword = await bcrypt.compare(Password, user.Password)

    if (!isMatchedPassword) {
        throw new Error('Unable to login')
    }

    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('Password')) {
        user.Password = await bcrypt.hash(user.Password, 8)
    }

    if (user.isModified('CreditCard')) {
        user.CreditCard = await bcrypt.hash(user.CreditCard, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User