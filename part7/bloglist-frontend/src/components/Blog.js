import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { likeBlog, deleteBlog, newComment } from '../reducers/blogsReducer'
import useField from '../hooks/useField'
import { Link as RouterLink } from 'react-router-dom'
import { Button, Card, CardContent, CardHeader, CardActions, Typography, TextField, List, ListItem, ListItemText, Link } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import DeleteIcon from '@material-ui/icons/Delete'


const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const comment = useField('textarea', 'comment')

  const handleLike = async (id) => {
    const likedBlog = blogs.find(blog => blog.id === id)

    dispatch(likeBlog(likedBlog))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(blog => blog.id === id)

    dispatch(deleteBlog(blogToRemove))
    history.push('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const commentToBeAdded = {
      comment: comment.value
    }

    comment.reset()
    dispatch(newComment(blog.id, commentToBeAdded))
  }

  if(!blog) return null

  return (
    <div>
      <Card className='blog' elevation={3}>
        <CardHeader
          title={blog.title}
          subheader={`Author ${blog.author}`}
        />
        <CardContent>
          <Typography component="a" href={blog.url}>
            {blog.url}
          </Typography>
          <Typography>
          Likes: {blog.likes}
          </Typography>
          <Typography>
          Added by user:
            <Link component={RouterLink} to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
          </Typography>
          <br/>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => handleLike(blog.id)}
            color="primary"
            variant="outlined"
            endIcon={<ThumbUpIcon/>}>
          Like
          </Button>
          {user.username === blog.user.username &&
          <Button
            onClick={() => handleRemove(blog.id)}
            variant="outlined"
            color="secondary"
            endIcon={<DeleteIcon/>}>
            remove
          </Button>
          }
        </CardActions>
        <CardContent>
          <form onSubmit={handleSubmit} autoComplete="off">
            <TextField variant="outlined" fullWidth {...comment } reset={null}/>
            <Button id ='add-comment-button' type='submit' variant="outlined" color="primary">add comment</Button>
          </form>
          <Typography variant="h6" component="h3">
          Comments:
          </Typography>
          <List>
            {blog.comments.map(comment =>
              <ListItem button key={blog.comments.indexOf(comment)}><ListItemText>{comment}</ListItemText></ListItem>
            )}
          </List>
        </CardContent>
      </Card>
    </div>

  )
}


export default Blog
