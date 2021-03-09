var app = require('../app')
require('dotenv').config()

app.listen(process.env.SERVER_PORT || 3000, function(req, res) {
  (process.env.SERVER_PORT.length > 1) ? console.log('App escuchando en el puerto: ' + process.env.SERVER_PORT) : console.log('App escuchando en el puerto por defecto: 3000')
})