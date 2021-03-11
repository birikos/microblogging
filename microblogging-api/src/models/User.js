const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

mongoose.set('useCreateIndex', true)
var Schema = mongoose.Schema;
var Post = require('../models/Post')


const SALT_WORK_FACTOR = 10

var UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true} },
  password: { type: String, required: true },
  fullname: String,
  email: { type: String, required: true },
  creationdate: { type: Date, default: Date.now },
  role: { type: String, enum: ['admin', 'subscriber'], default: 'subscriber' },
  posts: [{ type: Schema.ObjectId, ref: 'Post', default: null }]
})

UserSchema.pre('save', function(next){
  let user = this

  if (!user.isModified('password')) return next()

  bcryptjs.genSalt(SALT_WORK_FACTOR, function (err, salt){
    if (err) return next(err)

    bcryptjs.hash(user.password, salt, function (err, hash){
      if (err) return next(err)

      user.password = hash

      next()
    })
  })
})

UserSchema.methods.comparePassword = function(candidatePassword, cb){
  bcryptjs.compare(candidatePassword, this.password, function (err, isMatch){
    if(err) return cb(err)
    cb(null, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema)