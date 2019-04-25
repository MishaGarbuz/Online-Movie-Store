const express = require ('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const movieRouter = require('./routers/movie')
const orderRouter = require('./routers/order')
const supplierRouter = require('./routers/supplier')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(supplierRouter)
app.use(movieRouter)



app.listen(port, () => {
    console.log('Server is up on ' + port)
})