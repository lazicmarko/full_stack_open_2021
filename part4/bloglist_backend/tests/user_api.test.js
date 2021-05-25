const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash(helper.initialUsers[0].password, 10)

  const user = new User({
    name: helper.initialUsers[0].name,
    username: helper.initialUsers[0].username,
    passwordHash
  })

  await user.save()
})

const errorTest = async (user, message) => {
  const result = await api
    .post('/api/users')
    .send(user)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain(message)

  const usersAtEnd = await helper.usersInDb()

  expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
}

describe('When there is some initial users saved', () => {
  test('users are returned as json and amount is correct', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })
})

describe('Addition of a new user', () => {
  test('succeeds with valid data', async () => {
    const user = {
      username: 'Kekman',
      name: 'Kek',
      password: 'Password123'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    const usernames = usersAtEnd.map(user => user.username)

    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)
    expect(usernames).toContain('Kekman')
  })

  test('fails with status code 400 and shows the error message if username is missing', async () => {
    const user = {
      name: 'Kek',
      password: 'Password123'
    }

    await errorTest(user, 'username or password is missing')
  })

  test('fails with status code 400 and shows the error message if password is missing', async () => {
    const user = {
      name: 'Kek',
      username: 'Kekman'
    }

    await errorTest(user, 'username or password is missing')
  })

  test('fails with status code 400 and shows the error message if password is less than 3 characters', async () => {
    const user = {
      name: 'Kek',
      username: 'Kekman',
      password: 'Pa'
    }

    await errorTest(user, 'username and password must be at least 3 characters long')
  })

  test('fails with status code 400 and shows the error message if username is less than 3 characters', async () => {
    const user = {
      name: 'Kek',
      username: 'Ke',
      password: 'Password123'
    }

    await errorTest(user, 'username and password must be at least 3 characters long')
  })

  test('fails with status code 400 if username is not unique', async () => {
    const user = {
      username: 'root',
      name: 'Kek',
      password: 'Password123'
    }

    await errorTest(user, 'unique')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
