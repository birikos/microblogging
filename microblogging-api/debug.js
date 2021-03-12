const app = require('./app')
const debug = require('debug')('app:server')
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.Promise = global.Promise;
// Evitamos el mensaje de deprecado
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true)

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('mymernDB connection successful')

    app.listen(process.env.SERVER_PORT || 3000, () => {
      (process.env.SERVER_PORT.length > 1) ? debug('App en depuración escuchando en el puerto: ' + process.env.SERVER_PORT) : debug('App en depuración escuchando en el puerto por defecto: 3000')
    })
  })
  .catch((err) => console.error(err))