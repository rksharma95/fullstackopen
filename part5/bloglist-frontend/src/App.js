import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({})
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(true)
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleBlogForm}>
        <div>
          title
          <input 
            type="text"
            name="title"
            onChange={({target}) => setNewBlog({...newBlog, title:target.value})}
          />
        </div>
        <div>
          author
          <input 
            type="text"
            name="title"
            onChange={({target}) => setNewBlog({...newBlog, author:target.value})}
          />
        </div>
        <div>
          url
          <input 
            type="text"
            name="title"
            onChange={({target}) => setNewBlog({...newBlog, url:target.value})}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
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

  const handleBlogForm = async (event) => {
    event.preventDefault()
    try{
      await blogService.create(newBlog)
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

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
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
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
        </div>
      } 
    </div>
  )
}

export default App