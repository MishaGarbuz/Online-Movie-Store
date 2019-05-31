const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//----------------- Creates a new user using the post action of the app -----------------\\

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    user.Admin = false;
    user.Staff = false;

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
        res.cookie('token',token, {httpOnly: true})
        res.redirect('/wo')
    } catch (e) {
        res.status(400).send(e)
    }
})

//----------------- Only allows access when login credentials are successful -----------------\\

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.Email, req.body.Password)
        const token = await user.generateAuthToken()
        if (token) {
            loggedIn = true
        } else {
            loggedIn = false
        }
        res.cookie('token',token,{httpOnly: true})
        res.redirect('/')
        //res.render('index.hbs', {loggedIn})
    } catch (e) {
        res.status(400).send(e.message)
    }
})

//----------------- Gets all users using the get action of the app -----------------------\\

router.get('/users', async (req,res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

//------------------- Logout of Session --------------------------\\

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        loggedIn = false
        await req.user.save()
        res.clearCookie('token').redirect('/')
        //res.render('index', {loggedIn, pathToImage: 'img'})
        //res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

//------------------ Logout of all sessions --------------------\\

router.post('/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = []

        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

//----------------- Gets a specific user using the get action, and findById -----------------------\\


router.get('/users/me', auth, async (req,res) => {
    res.send(req.user)
})

//----------------- Updates a user using findByIdAndUpdate with authentication -----------------------\\

router.patch('/users/me', async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['Name','Email','Password','Age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//----------------- Deletes a specific user using findByIdAndDelete -----------------------\\

router.delete('/users/me', auth, async (req, res) => {
    try {

        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)

    }
})

router.get('/updateuser/:Name/:Email/:Address/:PhoneNumber/:Age', auth, async (req,res) => {
    const Name = req.params.Name;

    try {
        const user = await User.findOne({ Name, Name:req.user.Name})
        //console.log(user);

        if(!user) {
            return res.status(404).send()
        }

        res.render('updateuser', {
            Name: req.params.Name,
            Email: req.params.Email,
            Address: req.params.Address,
            PhoneNumber: req.params.PhoneNumber
        })
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/user/:Name', auth, async (req,res) => {
    const updates = Object.keys(req.body)
    //console.log(req.body)
    const allowedUpdates = ['Name','Email','Address','PhoneNumber', 'Age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if(!isValidOperation) {
        return res.status(404).send({ error: 'What you are trying to update, does not exist'})
    }

    try {
        const Name = req.params.Name;
        const user = await User.findOne({ Name, Name:req.user.Name})
    
        if(!user) {
            return res.status(404).send()
        }

        updates.forEach((update)=> user[update] = req.body[update])
        await user.save()
        res.redirect('/myaccount')
        //res.send(order)

    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router