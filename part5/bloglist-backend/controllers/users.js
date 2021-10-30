const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

const validateUser = (user) => {
  const {username, password} = user
  let errorMessage = undefined
  if(!username || !password){
    errorMessage = 'username or password is missing'
  }
  else if(username.length < 3){
    errorMessage = 'username should be at least 3 characters long'
  }
  else if(password.length < 3){
    errorMessage = 'password should be at least 3 characters long'
  }
  
  return errorMessage
}

usersRouter.post('/', async (req, res, next) => {
  const body = req.body

  const errorMessage = validateUser(body)

  if(errorMessage){
    res.status(400).json({error: errorMessage})
  }
  else
  {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password,saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUser = await user.save()

    if(savedUser){
      res.status(201).json(savedUser)
    }
    else{
      res.status(400).send({error: 'username is already taken'})
    }
  }
  
})

usersRouter.get('/', async (req, res, next) => {
  const users = await User.find({}).populate('blogs', {title:1, author:1, url:1})
  res.status(200).json(users)
})

usersRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id

  const deletedUser = await User.findByIdAndDelete(id)
  if(deletedUser){
    res.status(200).json(deletedUser)
  }
  else{
    res.status(400).end()
  }
})

module.exports = usersRouter