const mongoose = require('mongoose')

const resetTokenSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        // unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})



const ResetToken = mongoose.model('ResetToken', resetTokenSchema);


module.exports = ResetToken