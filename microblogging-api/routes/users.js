const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/User')

const db = mongoose.connection

router.get('/', function (req, res, next) {
  User.find().sort('-creationdate').exec(function (err, users){
    if (err) res.status(500).send(err)
    else res.status(200).json(users)
  })
})

router.post('/signin', function (req, res, next){
  User.findOne({username: req.body.username}, function (err, user){
    if (err) res.status(500).send({message: 'Error comprobando el usuario'})

    if (!user != null){
      user.comparePassword(req.body.password, function(err, isMatch){
        if (err) return next(err)

        if (isMatch){
          res.status(200).send({message: 'ok', role: user.role, id: user._id})
        }
        else{
          res.status(200).send({message: 'ko'})
        }

      })
    }else{
      res.status(200).send({ message: 'ko' })
    }

  })
})

router.get('/:id', function (req, res, next) {
  User.findById(req.params.id, function (err, userInfo){
    if (err) res.status(500).send(err)
    else res.status(200).json(userInfo)
  })
})

router.post('/', function (req, res, next){
  User.create(req.body, function (err, userInfo){
    if (err) res.status(500).send(err)
    else res.sendStatus(200)
  })
})

router.put('/:id', function (req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, userInfo){
    if (err) res.status(500).send(err)
    else res.sendStatus(200)
  })
})

router.delete('/:id', function (req, res, next) {
  User.findByIdAndDelete(req.params.id, function (err, userInfo){
    if (err) res.status(500).send(err)
    else res.sendStatus(200)
  })
})

module.exports = router