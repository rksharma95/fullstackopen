const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  let newObject = new Blog(helper.initialBlogs[0])
  await newObject.save()
  newObject = new Blog(helper.initialBlogs[1])
  await newObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all posts are returned',async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 100000)

test('an id is defined', async () => {
  let response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)
  expect(response.body[0].id).toBeDefined()  
  expect(response.body[0]._id).toBe(undefined)
  
})

test('a valid blog entry can be added', async () => {
  const newBlog = {
    title:'duckduckgo, search here',
    author:'duckduckgo',
    url:'https://www.duckduckgo.com',
    likes:'7'
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type',/application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb() 

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
  const titles = blogsAtEnd.map(blog => blog.title)
  expect(titles).toContain('duckduckgo, search here') 
  
})

test('likes must have default value 0', async () => {
  const newBlog = {
    title:'blog with no likes',
    author:'anonymous',
    url:'anyxyz.com',
  }

  const response = await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type',/application\/json/)
    
  expect(response.body.likes).toBe(0)
})

describe('title and url are required fields',() => {
  test('blog without title is not added', async () => {
    const noTitleBlog = {
      author:'some author',
      url:'some url',
      likes:15
    }

    await api.post('/api/blogs')
      .send(noTitleBlog)
      .expect(400)
  
  })

  test('blog without url is note added', async () => {
    const noUrlBlog = {
      title:'blog with a title',
      author:'some author',
      likes:10
    }

    await api.post('/api/blogs')
      .send(noUrlBlog)
      .expect(400) 
  })
})


afterAll(() => {
  mongoose.connection.close()
})

