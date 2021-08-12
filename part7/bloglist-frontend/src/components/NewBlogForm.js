import { Button, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import useField from '../hooks/useField'
import { newBlog } from '../reducers/blogsReducer'
import handleReset from '../utilities/resetFields'

const NewBlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()
  const title = useField('text', 'title')
  const author = useField('text', 'author')
  const url = useField('text', 'url')
  const fields = [title, author, url]

  const handleCreate = async (event) => {
    event.preventDefault()

    const blog = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    dispatch(newBlog(blog))
    blogFormRef.current.toggleVisibility()
    handleReset(fields)
  }

  return (
    <div>
      <Typography
        variant="h6"
        component="h3">
        Create new blog
      </Typography>
      <form onSubmit={handleCreate} autoComplete="off">
        <TextField variant="outlined" fullWidth label="title" {...title} reset={null} />
        <TextField variant="outlined" fullWidth label="author" {...author} reset={null}/>
        <TextField variant="outlined" fullWidth label="url" {...url} reset={null}/>
        <Button variant="outlined" color="primary" id ='create-blog-button' type="submit">create</Button>
      </form>
    </div>
  )
}

export default NewBlogForm
