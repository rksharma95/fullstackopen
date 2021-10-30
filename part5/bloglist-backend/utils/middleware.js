const User = require('../models/user')
const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method: ', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  logger.info('---')
  next()
}

const userExtractor = async (request, response, next) => {
  const authorization = request.get('authorization')
  console.log('authorization header: ',authorization)
  let token = null
  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')){
    token = authorization.substring(7)
  }
  console.log(token)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if(!token || !decodedToken.id){
    return response.status(401).json({error: 'token is missing or invalid'})
  }

  request.user = await User.findById(decodedToken.id)
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if(error.name === 'CastError'){
    return response.status(400).send({error: 'malformed id'})
  }
  else if(error.name === 'ValidationError'){
    return response.status(400).send({error: 'error.message'})
  }

  else if(error.name === 'JsonWebTokenError') 
  {    
    return response.status(401).json({error: 'invalid token'})
  }
  
  else if(error.name === 'TokenExpiredError'){
    return response.status(401).json({error: 'token expired'})
  }
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor
}