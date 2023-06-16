const mongoose = require('mongoose')

const announcementSchema = new mongoose.Schema({
  title: {type: String, required:true},
  image_encoded: String,
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  created_at : { type: Date, default: Date.now }
})


announcementSchema.set('toJSON', {
  transform : (document,  returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

const Announcement = mongoose.model('Announcement', announcementSchema)

module.exports = Announcement