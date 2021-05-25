const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const initialUsers = [
  {
    username :'root',
    name :'root',
    password: 'root'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})

  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})

  return users.map(user => user.toJSON())
}

const nonExistingId = async () => {
  const blog = {
    title: 'Go To Statement Considered Harmful2',
    author: 'Edsger W. Dijkstra2',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful2.html',
    likes: 52,
  }
  const blogToBeSavedAndRemoved = new Blog(blog)
  await blogToBeSavedAndRemoved.save()
  await blogToBeSavedAndRemoved.remove()

  return blogToBeSavedAndRemoved._id.toString()
}

module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId,
  initialUsers,
  usersInDb
}
