import React, { useState } from 'react'
import blogService from '../services/blogs'

const NewBlogForm = ({ blogs, setBlogs, setMessage, resetMessage, blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.create({
        title, author, url
      })

      blogFormRef.current.toggleVisibility()
      setAuthor('')
      setTitle('')
      setUrl('')
      setBlogs(blogs.concat(blog))
      setMessage({ text: `A new blog ${blog.title} by ${blog.author} added.`, classname: 'success' })
      resetMessage()
    } catch (exception) {
      setMessage({ text: exception.response.data.error, classname: 'error' })
      console.log(exception.response.data)
      resetMessage()
    }
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            id='title'
            type="text"
            value = {title}
            onChange = {({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type="text"
            value = {author}
            onChange = {({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type="text"
            value = {url}
            onChange = {({ target }) => setUrl(target.value)}
          />
        </div>
        <button id ='create-blog-button' type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm
