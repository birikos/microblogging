const jwt = require('jsonwebtoken')
const env = require('dotenv')
const moment = require('moment')

exports.createToken = function (user){
  let payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    fullname: user.fullname,
    posts: user.posts,
    creationdate: user.creationdate,
    role: user.role,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix()
  }

  return jwt.sign(payload, process.env.SECRET_TOKEN)
}