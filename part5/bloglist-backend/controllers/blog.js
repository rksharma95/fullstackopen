const blogRouter = require('express').Router()
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const {userExtractor} = require('../utils/middleware')

blogRouter.get('/', async(request, response, next) => {
  const blogs = await Blog.find({}).populate('user', {username:1, name:1})
  response.json(blogs)

})
  
blogRouter.post('/', userExtractor, async (request, response, next) => {
  const user = request.user
  //console.log('user posting a blog',user)
  const blog = new Blog({...request.body, user:user._id})
  //console.log('new blog to be added', blog)
  const result = await blog.save()
  //console.log('blog is saved')
  if(result){
    const userToUpdate = await User.findById(user._id)
    //console.log('user to update',userToUpdate)
    const updatedBlogs = [result._id].concat(userToUpdate.blogs)
    //console.log('updated blogs list', updatedBlogs)
    await userToUpdate.updateOne({blogs:updatedBlogs})
    console.log('blogs concatenated')
    //await userToUpdate.save()
    //console.log('user updated')
    response.status(201).json(result)
  }
  else{
    response.status(400).end()
  }

})

blogRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const user = request.user
  if(user.blogs.contains(request.params.id))
  {
    const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
    if(deletedBlog){
      response.status(200).json(deletedBlog)
    }
    else{
      response.status(400).end()
    }
  }
  else{
    response.status(401).json({error:'unauthorised to delete this blog'})
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