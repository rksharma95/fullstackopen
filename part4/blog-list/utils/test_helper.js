const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'google, search here',
    author: 'google',
    url:'https://www.google.com',
    likes:'15'
  },
  {
    title: 'yahoo, search here',
    author: 'yahoo',
    url:'https://www.yahoo.com',
    likes:'10'
  }

]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}