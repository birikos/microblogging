var express = require('express')
var app = express()

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')


app.use(function timelog(req, res, next) {
  console.log('fecha actual: ' + Date.now())
  next()
})
app.use('/', indexRouter)
app.use('/users', usersRouter)

module.exports = app