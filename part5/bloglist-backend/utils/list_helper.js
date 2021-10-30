const _ = require('lodash')

const dummy = (blogs) => {
  blogs.length
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((prev, current) => {
    return prev + current.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, curr) => {
    if(curr.likes > prev.likes){
      return curr
    }
    else{
      return prev
    }
  },{likes:0})
}

const mostBlogs = (blogs) => {
  const result =_.countBy(blogs, 'author')
  let author = []
  for(let item in result){
    author.push({author:item, blogs:result[item]})
  }
  author.sort((a, b) => a.blogs > b.blogs ? -1 : 1)
  return author[0]
}

const mostLikes = (blogs) => {
  return blogs.reduce((prev, curr) => {
    if(curr.likes >= prev.likes){
      return {author: curr.author, likes: curr.likes}
    }
    else{
      return {author: prev.author, likes: prev.likes}
    }
  }, blogs[0])
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}