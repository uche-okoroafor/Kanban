const colors = require('colors')
const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const { notFound, errorHandler } = require('./middleware/error')
const connectDB = require('./db')
const { join } = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const cors = require('cors')

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const boardRouter = require('./routes/board')
const columnRouter = require('./routes/column')
const cardRouter = require('./routes/card')
const pluginRouter = require('./routes/plugin')
const imageRouter = require('./routes/image')

const { json, urlencoded } = express
connectDB()
const app = express()
const server = http.createServer(app)

const io = socketio(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', socket => {
  console.log('connected')
})

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'))
}
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

app.use((req, res, next) => {
  req.io = io
  next()
})

app.use('/auth', authRouter)
app.use('/users', userRouter)

app.use('/card', cardRouter)
app.use('/column', columnRouter)
app.use('/board', boardRouter)
app.use('/plugins', pluginRouter)
app.use('/image', imageRouter)

app.use(express.static(join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname), 'client', 'build', 'index.html')
  )
} else {
  app.get('/*', (req, res) => {
    res.send('API is running')
  })
}

//    if (process.env.NODE_ENV === 'production') {
//   // Exprees will serve up production assets
//   app.use(express.static('client/build'));

//   // Express serve up index.html file if it doesn't recognize route
//   const path = require('path');
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

app.use(notFound)
app.use(errorHandler)

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  // Close server & exit process
  server.close(() => process.exit(1))
})

module.exports = { app, server }
