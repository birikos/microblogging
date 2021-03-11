const app = require('../app')
const debug = require('debug')('app:server')
require('dotenv').config()

app.listen(process.env.SERVER_PORT || 3000, () => {
  (process.env.SERVER_PORT.length > 1) ? debug('App en depuración escuchando en el puerto: ' + process.env.SERVER_PORT) : debug('App en depuración escuchando en el puerto por defecto: 3000')
})