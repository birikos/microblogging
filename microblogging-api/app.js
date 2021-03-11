const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const cors = require('cors')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))


app.use(function timelog(req, res, next) {
  console.log('fecha actual: ' + Date.now())
  next()
})


app.use('/', indexRouter)
app.use('/users', usersRouter)


module.exports = app