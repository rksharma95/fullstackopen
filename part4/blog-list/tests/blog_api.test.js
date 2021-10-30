const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/test_helper')
const Blog = require('../models/blog')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when some initial blogs are saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all posts are returned',async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('an id is defined in returned response', async () => {
    let response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type',/application\/json/)
    expect(response.body[0].id).toBeDefined()  
    expect(response.body[0]._id).toBe(undefined)
    
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
})

describe('adding a new blog entry', () => {
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

describe('deletion of a blog', () => {
  test('success with 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const blogTitles = blogsAtEnd.map(blog => blog.title)
    expect(blogTitles).not.toContain(blogToDelete.title)
  })
})

describe('updation a blog entry', () => {
  test('updating title of an existing blog',async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToBeUpdated = blogsAtStart[0]

    blogToBeUpdated.title = 'this title is updated'

    await api
      .put(`/api/blogs/${blogToBeUpdated.id}`)
      .send(blogToBeUpdated)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain(blogToBeUpdated.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

