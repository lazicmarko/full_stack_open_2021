const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

const loginWithRoot = async () => {
  const user = {
    username: helper.initialUsers[0].username,
    password: helper.initialUsers[0].password
  }

  const response = await api
    .post('/api/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  return response.body.token
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json and the amount is correct', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('property id exists', async () => {
    const blogsAtEnd = await helper.blogsInDb()

    for (const blog of blogsAtEnd) {
      expect(blog.id).toBeDefined()
    }
  })
})

describe('additiion of a new note', () => {
  test('succeeds with valid data', async () => {
    const token = await loginWithRoot()

    const newBlog = {
      title: 'New blog',
      author: 'Marko Lazic',
      url: 'https://google.com/',
      likes: 42
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('New blog')
  })

  test('succeeds with missing likes property - defaults to 0', async () => {
    const token = await loginWithRoot()

    const newBlog = {
      title: 'New blog',
      author: 'Marko Lazic',
      url: 'https://google.com/'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('fails with status code 400 if data is invalid', async () => {
    const token = await loginWithRoot()

    const newBlog = {
      author: 'Marko Lazic',
      url: 'gugl',
      likes: 42
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', `bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('fails with status code 401 if token is missing', async () => {
    const newBlog = {
      title: 'New blog',
      author: 'Marko Lazic',
      url: 'https://google.com/',
      likes: 42
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(response.body.error).toContain('invalid token')
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a new blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('modification of an existing blog', () => {
  test('is updated with status code 200 when id is valid', async () => {
    const newBlog = {
      title: 'New blog',
      author: 'Marko Lazic',
      url: 'https://google.com/',
      likes: 42
    }
    const blogsAtStart = await helper.blogsInDb()
    const blogToBeUpdated = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToBeUpdated.id}`)
      .send(newBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    expect(blogsAtEnd[0]).toEqual({ ...newBlog, id: blogsAtEnd[0].id })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
