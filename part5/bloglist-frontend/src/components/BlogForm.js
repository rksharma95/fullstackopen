import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({})

  const handleBlogForm = async (event) => {
    event.preventDefault()

    await addBlog(newBlog)
    setNewBlog({})
  }

  return(
    <div className='blog-form'>
      <h2>Create New</h2>
      <form onSubmit={handleBlogForm}>
        <div>
          title
          <input
            id='title'
            type="text"
            name="title"
            onChange={({ target }) => setNewBlog({ ...newBlog, title:target.value })}
          />
        </div>
        <div>
          author
          <input
            id='author'
            type="text"
            name="author"
            onChange={({ target }) => setNewBlog({ ...newBlog, author:target.value })}
          />
        </div>
        <div>
          url
          <input
            id='url'
            type="text"
            name="url"
            onChange={({ target }) => setNewBlog({ ...newBlog, url:target.value })}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogForm