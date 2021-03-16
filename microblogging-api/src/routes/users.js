const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const auth = require('../midlewares/authenticated')

router.get('/users', auth.ensureAuth, UserController.index)
router.post('/signin', UserController.signin)
router.get('/user/search/:id', auth.ensureAuth, UserController.search)
router.post('/user/create', UserController.createUser)
router.put('/user/:id', auth.ensureAuth, UserController.updateUser)
router.delete('/user/:id', auth.ensureAuth, UserController.deleteUser)

module.exports = router