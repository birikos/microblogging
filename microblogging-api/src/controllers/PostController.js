const mongoose = require('mongoose')
const Post = require('../models/Post')
const User = require('../models/User')

function index(req, res, next) {
  Post.find().sort('-publicationdate').populate('user').exec(function(err, posts){
    if(err) res.status(500).send(err)
    else res.status(200).json(posts)
  })
}

function getUserPosts(req, res, next){
  Post.find({ 'user':req.params.id }).sort('-publicationdate').populate('user').exec(function (err, posts){
    if (err) res.status(500).send(err)
    else res.status(200).json(posts)
  })
}

function createPost(req, res, next){
  User.findById(req.body.iduser, function (err, userInfo){
    if(err) res.status(500).send(err)
    else{
      // Creamos la instancia del post
      let postInstance = new Post({
        user: req.body.iduser,
        title: req.body.title,
        description: req.body.description
      })
      // Se añase postInstance al array de posts del usuario
      userInfo.posts.push(postInstance)
      // Guardamos el post en las colecciones users u posts
      userInfo.save(function (err){
        if(err) res.status(500).send(err)
        else{
          postInstance.save(function (err) {
            if(err) res.status(500).send(err)
            res.sendStatus(200)
          })
        }
      })
    }
  })
}

function updatePost(req, res, next){
  Post.findByIdAndUpdate(req.params.id, req.body, function (err, postInfo){
    if(err) res.status(500).send(err)
    else res.sendStatus(200)
  })
}

function deletePost(req, res, next){
  Post.findByIdAndDelete(req.params.id, function (err, postInfo){
    if(err) res.status(500).send(err)
    else{
      User.findByIdAndUpdate(postInfo.user, {$pull: {posts: postInfo._id}},
        function (err, userInfo) {
          if(err) res.status(500).send(err)
          else res.sendStatus(200)
        })
    }
  })
}

module.exports = {
  index,
  getUserPosts,
  createPost,
  updatePost,
  deletePost
}