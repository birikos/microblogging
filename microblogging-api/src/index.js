const app = require('../app')
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(() => console.log('mymernDB connection successful'))
  .catch((err) => console.error(err))


app.listen(process.env.SERVER_PORT || 3000, function(req, res) {
  (process.env.SERVER_PORT.length > 1) ? console.log('App escuchando en el puerto: ' + process.env.SERVER_PORT) : console.log('App escuchando en el puerto por defecto: 3000')
})