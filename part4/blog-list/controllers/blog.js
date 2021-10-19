const blogRouter = require('express').Router()
const mongoose = require('mongoose')
const Blog = require('../models/blog')

blogRouter.get('/', async(request, response, next) => {
  const blogs = await Blog.find({})
  response.json(blogs)

})
  
blogRouter.post('/',async (request, response, next) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  if(result){
    response.status(201).json(result)
  }
  else{
    response.status(400).end()
  }

})

blogRouter.delete('/:id', async (request, response, next) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
  if(deletedBlog){
    response.status(200).json(deletedBlog)
  }
  else{
    response.status(400).end()
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body)
  if(updatedBlog){
    response.status(200).json(updatedBlog)
  }
  else{
    response.status(400).end()
  }
})

module.exports = blogRouter  