const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostController')

router.get('/posts', PostController.index)
router.get('/post/all/:id', PostController.getUserPosts)
router.post('/post', PostController.createPost)
router.put('/post/:id', PostController.updatePost)
router.delete('/post/:id', PostController.deletePost)

module.exports = router