import React, {useState} from 'react'

const BlogForm = ({addBlog}) => {
  const [newBlog, setNewBlog] = useState({})

  const handleBlogForm = async (event) => {
    event.preventDefault()

    await addBlog(newBlog)
    setNewBlog({})  
  }
  
  return(
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
}

export default BlogForm