const mongoose = require('mongoose')
const Post = require('../models/Post')

function index(req, res, next) {
  res.send('Página post')
}

module.exports = {
  index
}