const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

describe('when there is only one user initially', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)

    const user = new User({username:'root', passwordHash})

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mike',
      name:'michal',
      password:'mikepass'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type',/application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    const usernames = usersAtEnd.map(user => user.username)
    expect(usersAtEnd).toHaveLength(userAtStart.length + 1)
    expect(usernames).toContain('mike')  
  })

  test('if username is already taken user creation will failed', async () => {
    const usersAtStart = await helper.usersInDb()

    const userWithExistingUsername = {
      username: 'root',
      name:'mike',
      password:'mikepass'
    }

    const result = await api
      .post('/api/users')
      .send(userWithExistingUsername)
      .expect(400)
      .expect('Content-Type',/application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
    console.log(result)
    expect(result.body.error).toContain('username is already taken')
  })
})

afterAll(() => {
  mongoose.connection.close()
})