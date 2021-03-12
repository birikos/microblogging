const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.get('/users', UserController.index)
router.post('/signin', UserController.signin)
router.get('/user/search/:id', UserController.search)
router.post('/user/create', UserController.createUser)
router.put('/user/:id', UserController.updateUser)
router.delete('/user/:id', UserController.deleteUser)

module.exports = router