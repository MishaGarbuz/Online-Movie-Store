const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

//----------------- Creates a new user using the post action of the app -----------------\\

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

//----------------- Only allows access when login credentials are successful -----------------\\

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.Email, req.body.Password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (e) {
        res.status(400).send()
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
        await req.user.save()

        res.send()
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

router.patch('/users/me', auth, async (req,res) => {
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

module.exports = router