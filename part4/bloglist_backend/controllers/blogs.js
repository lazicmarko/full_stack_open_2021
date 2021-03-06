const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const body = request.body
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  let populated = await savedBlog.populate('user', { username: 1, name: 1 }).execPopulate()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(populated)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)

  if ((blog.user.toString() !== decodedToken.id)) {
    return response.status(401).json({ error: 'you cant delete others blogs' })
  }

  await blog.deleteOne()
  user.blogs = user.blogs.filter(b => b.id.toString() !== request.params.id.toString())
  await user.save()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const body = request.body

  const blogToBeUpdated = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blogToBeUpdated, { new: true })
    .populate('user', { username: 1, name: 1, id: 1 })
  response.json(updatedBlog.toJSON())
})

// COMMENTS

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body

  const blog = await Blog.findById(request.params.id)

  const blogToBeUpdated = {
    comments: blog.comments.concat(body.comment)
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blogToBeUpdated, { new: true })
    .populate('user', { username: 1, name: 1, id: 1 })

  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter
