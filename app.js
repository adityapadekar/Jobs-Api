require('dotenv').config()
require('express-async-errors')

// require express and create app
const express = require('express');
const app = express()

// middlewares
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
const authenticateUser = require('./middleware/auth');


// connectDB
const connectDB = require('./db/connect');

// // routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

// Parse the incoming requests with JSON payloads
app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser ,jobsRouter)



// Use User defined middlewares
app.use(errorHandlerMiddleware)
app.use(notFound)


// port variable
const port = process.env.PORT || 3000


// app start function + connecting to database
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () =>
            console.log(`Server is listening on the port ${port}`)
        )
    } catch (err) {
        console.log(err)
    }
}

start()