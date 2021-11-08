import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(true)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => {
          return a.likes > b.likes ? -1 : 1
        }) 
      )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const loginForm = () => (
    <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="username"
              onChange={({target}) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input 
              type="password"
              value={password}
              name="password"
              onChange={({target}) => setPassword(target.value)}
            />
          </div>
          <div>
            <button type="submit">login</button>
          </div>  
        </form>
      </div>
  )

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Togglable>
  )

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch(exception){
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    console.log('loging with', username, password)
  }

  const addBlog = async (newBlog) => {
    
    try{
      blogFormRef.current.toggleVisibility()
      blogService.create(newBlog)
        .then(newBlog => {
          setBlogs(blogs.concat(newBlog))
          return newBlog
        })
        .then(newBlog => {
          setIsError(false)
          setMessage(`a new blog ${newBlog.title} by ${newBlog.author} is added`)
          setTimeout(() => {
            setMessage(null)
            //setIsError(true)
          }, 5000)
        })
    }
    catch(exception){
      setMessage('error creating a new blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try{
      blogService.deleteOne(id)
        .then(item => {
          setBlogs(blogs.filter(blog => blog.id !== item.id))
        }) 
    }
    catch(exception){
      setMessage('error deleting a blog')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }
  
  const likePost = async(blog) => {
    const updatedBlog = await blogService.update({...blog, likes:blog.likes+1})
    setBlogs(blogs.map(blog => 
      blog.id===updatedBlog.id?
      {...updatedBlog, likes:updatedBlog.likes+1}:
      blog))
  }

  return (
    <div>
      <Notification message={message} isError={isError}/>
      {user === null && loginForm()}
      {user !== null && 
        <div>
          <h2>blogs</h2>
          {`${user.name} logged in`}
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} 
              blog={blog} 
              likePost={likePost}
              deletePost={deleteBlog}/>
          )}
        </div>
        </div>
      } 
    </div>
  )
}

export default App