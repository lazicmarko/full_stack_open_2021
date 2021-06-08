import React, { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleRemove }) => {
  const [showDetails, setShowDetails] = useState(false)
  const showWhenVisible = { display: showDetails ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      <div className='blog-heading'>
        {blog.title} - {blog.author} - <button className='view-button' onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible} className='blog-details'>
        <div className='url'>{blog.url}</div>
        <div className='likes'>likes {blog.likes} <button className='like-button' onClick={() => handleLike(blog.id)}>like</button></div>
        <div>{blog.user.name}</div>
        {user.username === blog.user.username &&
          <button className='remove-btn' onClick={() => handleRemove(blog.id)}>remove</button>
        }
      </div>
    </div>
  )
}


export default Blog
