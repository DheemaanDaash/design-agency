require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout =  require('express-ejs-layouts')
const PORT = process.env.PORT || 3300
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
// const MongoDbStore =  require ('connect-mongo')(session)
const MongoStore = require('connect-mongo');


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

//Session Config and Store
app.use(session({
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: true,
    resave: true,
    store: MongoStore.create({
        mongoUrl: "mongodb://localhost/design",
        // db: mongoose.connection.db,
        ttl: 5 * 24 * 60 * 60 // 5 days
      }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } //24 hours
}))

app.use(flash())

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