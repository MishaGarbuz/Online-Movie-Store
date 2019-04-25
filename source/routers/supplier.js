const express = require('express')
const router = new express.Router()
const Supplier = require('../models/supplier')

//----------------- Creates a new supplier using the post action of the app -----------------\\

router.post('/suppliers', async (req, res) => {
    const supplier = new Supplier(req.body)

    try {
        await supplier.save()
        res.status(201).send(supplier)
    } catch (e) {
        res.status(400).send(e)
    }
})



module.exports = router