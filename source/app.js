const express = require('express')
const hbs = require('hbs')
const path = require('path')
require('./db/mongoose')
const userRouter = require('./routers/user')
const supplierRouter = require('./routers/supplier')
const orderRouter = require('./routers/order')
const bodyParser = require('body-parser')



const app = express()
const port = process.env.PORT || 3000
// define paths for express coniguration
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Use body-parser as middleware for the app.
app.use(bodyParser.json())
// Permit the app to parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(userRouter)
app.use(supplierRouter)
app.use(orderRouter)

// setup handle bars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Index',
        name: 'Michael Garbuz'
    })
})

app.get('/login', (req,res) => {
    res.render('login', {
        title: 'Login',
        name: 'Michael Garbuz'
    })
})

app.get('/register', (req,res) => {
    res.render('register', {
        title: 'Register',
        name: 'Michael Garbuz'
    })
})

app.get('/myaccount', (req,res) => {
    res.render('myaccount', {
        title: 'My Account',
        name: 'Michael Garbuz'
    })
})

app.get('/store',(req,res) => {
    res.render('store', {
        title: 'Online Movie Store',
        name: 'Michael Garbuz'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Michael Garbuz'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Michael Garbuz',
        helpText: 'Insert help text'
    })
})

app.listen(port, () => {
    console.log('Server up on port ' + port)
})