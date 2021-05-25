const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs')

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!(body.password && body.username)) {
    return response.status(400).json({ error: 'username or password is missing' })
  } else if (body.password.length < 3 || body.username.length < 3) {
    return response.status(400).json({ error: 'username and password must be at least 3 characters long' })
  }

  const passwordHash = await bcrypt.hash(body.password, 10)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
