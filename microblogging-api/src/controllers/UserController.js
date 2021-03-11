const mongoose = require('mongoose')
const User = require('../models/User')

function index(req, res, next){
  User.find().sort('-creationdate').select(["-password", "-__v"]).exec(function (err, users) {
    if (err) res.status(500).send(err)
    else res.status(200).json(users)
  })
}

function signin(req, res, next){
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) res.status(500).send({ message: 'Error comprobando el usuario' })

    if (!user != null) {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) return next(err)

        if (isMatch) {
          res.status(200).send({ message: 'ok', role: user.role, id: user._id })
        }
        else {
          res.status(200).send({ message: 'ko' })
        }

      })
    } else {
      res.status(200).send({ message: 'ko' })
    }

  })
}

function createUser(req, res, next){
  User.create(req.body, function (err, userInfo) {
    if (err) res.status(500).send(err)
    else res.sendStatus(200)
  })
}

function updateUser(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, userInfo) {
    if (err) res.status(500).send(err)
    else res.sendStatus(200)
  })
}

function deleteUser(req, res, next) {
  User.findByIdAndDelete(req.params.id, function (err, userInfo) {
    if (err) res.status(500).send(err)
    else res.sendStatus(200)
  })
}

function search(req, res, next){
  User.findById(req.params.id, function (err, userInfo) {
    if (err) res.status(500).send(err)
    else res.status(200).json(userInfo)
  })
}


module.exports = {
  index,
  signin,
  createUser,
  updateUser,
  deleteUser,
  search,
}