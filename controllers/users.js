const mongoose = require('mongoose')
const userRouter = require('express').Router()
const User = require('../models/user')
const ResetToken = require('../models/resetToken')
const bcrpyt = require('bcrypt')
const crypto = require('crypto')

require('dotenv').config()

const sendMail = require('./sendMail')




userRouter.post('/', async(req,res, next) => {
    const body = req.body

    const saltRounds = 10
    const passwordHash = await bcrpyt.hash(body.password, saltRounds)

    const user = new User({
        name : body.name,
        username: body.username,
        passwordHash 
    })

    const savedUser = await user.save()
    res.json(savedUser)
})



userRouter.get('/reset', (req,res) => {
    res.render('pages/password_reset.ejs')
})


userRouter.post('/reset-password-request', async (req, res) => {
  const email = req.body.email;

  try {
    // Generate a random token
    const token = crypto.randomBytes(20).toString('hex');

    const user = await User.findOne({email: email})
    if (!user){
      res.send("This Email is not authorized")
      return 
    }
    // Create a new reset token document
    const resetToken = new ResetToken({
      email,
      token
    });

    // Save the token in the database
    await resetToken.save();

    // Generate the unique reset link using the email and token
    const resetLink = `${process.env.APP_URL}/users/reset-password/${token}`;

    sendMail(email, 'Password Reset Link', `Click this link to reset your password reset ${resetLink}.`)

    res.send('Reset link generated and sent successfully');
  } catch (error) {
    console.log(error)
    res.send('Error sending reset link to email.');
  }
});

// Route for handling password reset
userRouter.get('/reset-password/:token', async (req, res) => {
  const token = req.params.token;

  try {
    // Find the reset token in the database
    const resetToken = await ResetToken.findOne({ token });

    // Check if the token is valid and not expired
    if (!resetToken) {
      res.send('Invalid or expired reset token');
    }
    return res.render('pages/password_reset_main.ejs')


    // Respond with a success message
  } catch (error) {
    console.log(error)
    res.send('Could not validate reset link');
  }
});


userRouter.post('/reset-password/:token', async (req, res) => {
    const token = req.params.token;

    const body = req.body;
    const password = body.newpassword.trim();
    console.log(password)

    const resetToken = await ResetToken.findOne({ token });

    if (!resetToken) {
      res.send('Invalid or expired reset token');
    }

    
    const user = await User.findOne({ email: resetToken.email });
    const saltRounds = 10
    const passwordHash = await bcrpyt.hash(password, saltRounds)

    user.passwordHash = passwordHash;

    await user.save();
    // Delete the reset token from the database
    await resetToken.remove();

    res.send('Password has been reset successfully')
})



module.exports = userRouter