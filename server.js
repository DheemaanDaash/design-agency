require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout =  require('express-ejs-layouts')
const PORT = process.env.PORT || 3300
const mongoose = require('mongoose')
const session = require('express-session')

//Database Connection
const url = 'mongodb://localhost/design';
//const url = 'mongodb+srv://dh33m44n:P9yqJXKMAGGaTsGX@cluster0.mskgs.mongodb.net/design?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});

//Session Config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge 1000 * 60 * 60 * 24} //24 hours
}))

//Asset
app.use(express.static('public'))

// set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})