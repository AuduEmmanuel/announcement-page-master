const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')


loginRouter.post('/create_announcement' , async(req,res) => {
    const body = req.body
    const user = await User.findOne({ username: body.username.trim() })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    console.log("User does not exist")
    return res.render('pages/login.ejs', {message: 'Username or password does not exist'})
  }

  console.log("Verified user")
  return res.render('pages/create_announcement.ejs')
  // return res.redirect('/announcements/create')
})

loginRouter.get('/', (req,res) => {
  res.render('pages/login.ejs', {message: ''})
})



module.exports = loginRouter