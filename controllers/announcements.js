const announcementsRouter = require('express').Router()
const mongoose = require('mongoose')
const Announcement = require('../models/announcement')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')


announcementsRouter.get('/latest', async (req, res ) => {
  await Announcement.find(
    {}, {}, 
    { sort: { 'created_at' : -1 }}, 
    function(err, latestDoc) {
      // if (err) {
      //   console.log(err);
      //   return res.status(404) .json({});
      // }
      
      return res.status(200).json(latestDoc)
    }); 
      // return res.status(404) .json({})
})


announcementsRouter.post('/WwQjWI4ZNC8P2EZzuiBsqelrxr', async(req, res) => {
  const body = req.body
  console.log(body)

  const announcement = new Announcement({
    title : body.message,
    image_encoded: body.imageData,
})

  await announcement.save()
  return res.status(200)
    
})

module.exports = announcementsRouter