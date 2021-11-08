import React, {useState} from 'react'

const Blog = ({blog, likePost, deletePost}) => {
  const [visible, setVisible] = useState(false)
  
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    likePost(blog)
  }

  const handleRemove = () => {
    if(window.confirm(`remove blog ${blog.title} by ${blog.author}`)){
      deletePost(blog.id)
    }
  }
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={toggleVisibility}> view </button>
      {visible && 
        (
          <div>
            <p>
              {blog.author}
              <button>hide</button>
            </p>
            <p>{blog.url}</p>
            <p>
              {blog.likes}
              <button onClick={handleLike}>like</button>
            </p>
            <p>
              <button onClick={handleRemove}>remove</button>
            </p>
          </div>
        )
      }
    </div>
  )  
}

export default Blog