var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  res.send('Página de inicio')
})

module.exports = router