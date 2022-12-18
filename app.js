const express = require('express')
const app = express()
const tasks = require ('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandle = require('./middleware/error')
app.use(express.json())
app.use(express.static('./public'))
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandle)

const port= process.env.PORT || 5000

const start = async () => {
    try{
        await connectDB(process.env.MON_URI)
        app.listen(port,console.log(`Server is listening on port ${port}...`))
    }
    catch(error){
        console.log(error)
    }
}

start()

