const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostController')

router.get('/posts', PostController.index)

module.exports = router