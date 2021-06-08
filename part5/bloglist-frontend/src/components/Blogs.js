import React from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

function Blogs({ blogs, setBlogs, user, setMessage, resetMessage }) {
  const handleLike = async (id) => {
    const likedBlog = blogs.find(blog => blog.id === id)

    try {
      const updatedBlog = await blogService.update({
        id: likedBlog.id,
        title: likedBlog.title,
        author: likedBlog.author,
        url: likedBlog.url,
        likes: likedBlog.likes + 1
      })

      const updatedBlogs = [...blogs]
      updatedBlogs[updatedBlogs.indexOf(likedBlog)] = updatedBlog

      setBlogs(updatedBlogs)
      setMessage({ text: `${likedBlog.title} liked`, classname: 'success' })
      resetMessage()
    } catch (error) {
      setMessage({ text: error.response.data.error, classname: 'error' })
      resetMessage()
    }
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(blog => blog.id === id)
    console.log(blogToRemove)

    if(window.confirm(`Remove blog ${blogToRemove.title}! by ${blogToRemove.author}`)) {
      try {
        const deletedBlog = await blogService.remove(blogToRemove.id)
        console.log(deletedBlog, 'removed')

        const updatedBlogs = [...blogs]
        setBlogs(updatedBlogs.filter(blog => blog.id !== blogToRemove.id))
        setMessage({ text: `${blogToRemove.title} removed`, classname: 'success' })
        resetMessage()
      } catch (error) {
        setMessage({ text: error.response.data.error, classname: 'error' })
        resetMessage()
      }
    }
  }

  return (
    <div id='bloglist'>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            resetMessage={resetMessage}
            setMessage={setMessage}
            handleLike={handleLike}
            handleRemove={handleRemove}/>
        )}
    </div>
  )
}

export default Blogs
