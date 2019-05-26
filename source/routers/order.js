const express = require('express')
const router = new express.Router()
const Order = require('../models/order')
const auth = require('../middleware/auth')

router.post('/orders', auth, async (req, res) => {
    const order = new Order({
        ...req.body,
        Owner: req.user._id
    })
    try {
        await order.save()
        res.status(201).send(order)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/allorders', async (req,res) => {
    try {
        const orders = await Order.find({})
        res.send(orders)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/orders', auth, async (req,res) => {
    try {
        // const orders = await Order.find({})
        await req.user.populate('Orders').execPopulate()
        res.send(req.user.Orders)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/orders/:id', auth, async (req,res) => {
    const _id = req.params.id

    try {
        const order = await Order.findOne({ _id, Owner: req.user._id})
        
        if(!order) {
            return res.status(404).send()
        }
        res.send(order)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/orders/:id', auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['Completed','Description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if(!isValidOperation) {
        return res.status(404).send({ error: 'What you are trying to update, does not exist'})
    }

    try {
        const order = await Order.findOne({ _id: req.params.id, Owner: req.user._id})
    
        if(!order) {
            return res.status(404).send()
        }

        updates.forEach((update)=> order[update] = req.body[update])
        await order.save()
        res.send(order)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/orders/:id', auth, async (req, res) => {
    try {
        const order = await Order.findOneAndDelete({_id: req.params.id, Owner: req.user._id})

        if(!order) {
            return res.status(404).send({ error:'Order not found!' })
        }

        res.send(order)

    } catch(e) {
        res.status(500).send(e)
    }
})


module.exports = router