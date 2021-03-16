const jwt = require('jsonwebtoken')
const env = require('dotenv')
const moment = require('moment')

exports.ensureAuth = function (req, res, next){
  if(!req.headers.authorization) return res.status(403).send({ message: 'Esta acción no es posible sin una cabecera autorización' })

  let token = req.headers.authorization.replace(/['"]+/g, "");

  try{
    var payload = jwt.verify(token, process.env.SECRET_TOKEN)
    if(payload.exp < moment().unix()) return res.status(401).send({ message: 'Lo sentimos, el token ha expirado. Vuelva a identificarse para obtener uno nuevo' })
  }catch (ex){
    return res.status(401).send({ message: 'Lo sentimos, el token no es valido. Vuelva a identificarse para obtener uno nuevo' })
  }

  req.user = payload

  next()
}