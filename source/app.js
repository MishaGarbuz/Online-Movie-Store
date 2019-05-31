const express = require('express')
const hbs = require('hbs')
const path = require('path')
require('./db/mongoose')
const userRouter = require('./routers/user')
const supplierRouter = require('./routers/supplier')
const orderRouter = require('./routers/order')
const bodyParser = require('body-parser')
const auth = require('../source/middleware/auth')



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
    if (req.headers.cookie) {
        loggedIn = true
    } else {
        loggedIn = false;
    }
    res.render('index', {
        title: 'Index',
        name: 'Michael Garbuz',
        pathToImage: 'img1',
        loggedIn: loggedIn
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

app.get('/neworder', (req,res) => {
    if (req.headers.cookie) {
        loggedIn = true
    } else {
        loggedIn = false;
    }
    res.render('neworder', {
        title: 'New Order',
        name: 'Michael Garbuz',
        loggedIn
    })
})

app.get('/updateorder', (req,res) => {
    if (req.headers.cookie) {
        loggedIn = true
    } else {
        loggedIn = false;
    }
    res.render('updateorder', {
        title: 'Update Order',
        name: 'Michael Garbuz',
        loggedIn
    })
})

app.get('/cancelorder', (req,res) => {
    if (req.headers.cookie) {
        loggedIn = true
    } else {
        loggedIn = false
    }
    res.render('cancelorder', {
        title: 'Cancel Order',
        name: 'Cancel Order',
        loggedIn
    })
})

app.get('/myaccount', auth, (req,res) => {
    res.render('myaccount', {
        title: 'My Account',
        name: 'Michael Garbuz',
        User: req.user,
        loggedIn: true
    })
})


app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Michael Garbuz'
    })
})

app.get('/movies', (req,res) => {
    res.render('movies', {
        title: 'Movies'
    })
})

app.listen(port, () => {
    console.log('Server up on port ' + port)
})