const express = require('express')
const router = new express.Router()
const Order = require('../models/order')
const auth = require('../middleware/auth')
const bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

router.post('/orders', auth, async (req, res) => {
    const order = new Order({
        ...req.body,
        Owner: req.user._id
    })
    try {
        await order.save()
        //res.status(201).send(order)
        res.redirect('orders')
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
    const match = {}
    const sort = {}

    if (req.query.Completed) {
        match.Completed = req.query.Completed === 'true'
    } 

    if (req.query.sortBy) {
        const parameters = req.query.sortBy.split(':')
        sort[parameters[0]] = parameters[1] === 'desc' ? -1 : 1 //the part after ? is true, after : is false 
    }

    try {
        await req.user.populate({
            path: 'Orders',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        
        //res.send(req.user.Orders)
       // console.log(req)
        //console.log(req.user)
        
        res.render('myorders', {
            title: 'My Orders',
            name: 'Michael Garbuz',
            orderList: req.user.Orders,
            loggedIn: true 
        });
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/updateorder/:id/:Movie/:Completed/:Quantity', auth, async (req,res) => {
    const _id = req.params.id

    try {
        const order = await Order.findOne({ _id, Owner: req.user._id})
        
        if(!order) {
            return res.status(404).send()
        }
        //res.send(order)
        console.log(req)
        res.render('updateorder', {
            title: 'Update Orders',
            name: 'Michael Garbuz',
            _id: req.params.id,
            Movie: req.params.Movie,
            Completed: req.params.Completed,
            Quantity: req.params.Quantity,
            Status: req.params.Status
        })
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/cancelorder/:id/:Movie/:Completed/:Quantity/:Status', auth, async (req,res) => {
    const _id = req.params.id

    try {
        const order = await Order.findOne({ _id, Owner: req.user._id})
        
        if(!order) {
            return res.status(404).send()
        }
        //res.send(order)
        console.log(req)
        res.render('cancelorder', {
            title: 'Update Orders',
            name: 'Michael Garbuz',
            _id: req.params.id,
            Movie: req.params.Movie,
            Completed: req.params.Completed,
            Quantity: req.params.Quantity,
            Status: req.params.Status
        })
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/orders/:id', auth, async (req,res) => {
    const updates = Object.keys(req.body)
    console.log(req.body)
    const allowedUpdates = ['Movie','Completed','Quantity','Status']
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
        res.redirect('/orders')
        //res.send(order)

    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/orders/:id', auth, async (req, res) => {
    try {
        const order = await Order.findOneAndDelete({_id: req.params.id, Owner: req.user._id})

        if(!order) {
            return res.status(404).send({ error:'Order not found!' })
        }

        //res.send(order)
        res.redirect('/orders')

    } catch(e) {
        res.status(500).send(e)
    }
})


module.exports = router