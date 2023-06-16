const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    name : String,
    username : {type: String, required:true, minlength:3 , unique:true},
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    passwordHash : {type:String, required:true, minlength:3},
    announcements: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Announcement'
        }
    ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()

        delete returnedObj._id
        delete returnedObj.passwordHash
        delete returnedObj.__v

    }
})

const User = mongoose.model('User', userSchema)

module.exports = User