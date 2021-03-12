const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const usersRouter = require('./src/routes/users')
const postsRouter = require('./src/routes/posts')

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(function timelog(req, res, next) {
  console.log('fecha actual: ' + Date.now())
  next()
})

app.use('/api', usersRouter)
app.use('/api', postsRouter)

module.exports = app