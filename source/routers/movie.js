const express = require('express')
const router = new express.Router()
const Movie = require('../models/movie')

//----------------- Creates a new movie using the post action of the app -----------------\\

router.post('/movies', async (req, res) => {
    const movie = new Movie(req.body)

    try {
        await movie.save()
        res.status(201).send(movie)
    } catch (e) {
        res.status(400).send(e)
    }
})

//----------------- Gets all movies using the get action of the app -----------------------\\

router.get('/movies', async (req,res) => {
    try {
        const movies = await Movie.find({})
        res.send(movies)
    } catch (e) {
        res.status(500).send()
    }
})
//----------------- Gets a specific movie using the get action, and findById -----------------------\\

router.get('/movies/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const movie = await Movie.findById(_id)
        if (!movie) {
            return res.status(404).send()
        }
        res.send(movie)
    } catch (e) {
        res.status(500).send()
    }
})

//----------------- Updates a movie using findByIdAndUpdate with authentication -----------------------\\

router.patch('/movies/:id', async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['Name','Email','Password','Age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id,req.body,{ new: true, runValidators: true})

        if(!movie) {
            return res.status(404).send()
        }

        res.send(movie)
    } catch (e) {
        res.status(400).send(e)
    }
})

//----------------- Deletes a specific movie using findByIdAndDelete -----------------------\\

router.delete('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id)

        if(!movie) {
            return res.status(404).send({ error: 'Movie not found!' })
        }

        res.send(movie)
    } catch (e) {
        res.status(500).send(e)

    }
})

module.exports = router