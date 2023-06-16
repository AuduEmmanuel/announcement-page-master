const express = require('express')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const announcementsRouter = require('./controllers/announcements')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const User = require('./models/user')
const ResetToken= require('./models/resetToken')
const Announcement = require('./models/announcement')
const path = require('path')
const bcrpyt = require('bcrypt')
const bodyParser = require('body-parser');



mongoose
    .connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log('connected to MongoDB'))
    .catch(err => console.log('error connecting to MongoDB: ', err.message))

const resetDBs = async() => {
    await User.deleteMany({})
    await ResetToken.deleteMany({})


    const saltRounds = 10
    const passwordHash = await bcrpyt.hash("Audu", saltRounds)

    const user = new User({
        name: "Audu",
        username: "myusername",
        email: "audu.emmanuel@stu.cu.edu.ng",
        passwordHash 
    })

    const savedUser = await user.save()
    console.log("User saved ")

    await Announcement.deleteMany({})
}

// resetDBs()
// process.exit()
    
const app = express()
// app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({limit: "50mb"}));
app.use(cors())
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(middleware.tokenExtractor)

app.use('/announcements', announcementsRouter)
app.use('/users', userRouter)
app.use('/login', loginRouter)

app.get('/', (req,res)=> {
    //fetch latest announcement
    res.render('pages/index.ejs')
})
app.use(middleware.errorHandler)


module.exports = app