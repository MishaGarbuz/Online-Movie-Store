const express = require('express')
const hbs = require('hbs')
const path = require('path')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app = express()
const port = 3000
// define paths for express coniguration
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

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

app.get('/orders', (req, res) => {
    res.render('orders', {
        title: 'Orders',
        name: 'Dov Royal'
    })
})

app.get('/register', (req,res) => {
    res.render('register', {
        title: 'Register',
        name: 'Michael Garbuz'
    })
})

app.get('/movies',(req,res) => {
    res.render('movies', {
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