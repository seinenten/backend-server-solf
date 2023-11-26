const { Schema, model } = require('mongoose');

const shortid = require('shortid');

const PaymentSchema = Schema({
    name: {
        type: String
    },
    amount: {
        type: Number
    },
    localizator: {
        type: String,
        default: shortid.generate()
    },
    stripeId: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['success', 'fail', 'wait'],
        default: 'wait'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        
        
    }
},
    {
        timestamps: true,
        versionKey: false
    })


module.exports = model('Payment', PaymentSchema);