import blogService from '../services/blogs'
import { setMessage } from './notificationReducer'
import commentService from '../services/comments'

export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs
      })
    } catch (e) {
      dispatch(setMessage({ text: e.response.data.error, classname: 'error' }))
    }
  }
}

export const newBlog = (content) => {
  return async dispatch => {
    try {
      const blog = await blogService.create({
        title: content.title,
        url: content.url,
        author: content.author,
      })
      dispatch({
        type: 'NEW_BLOG',
        data: blog
      })
      dispatch(setMessage({
        text: `A new blog ${blog.title} by ${blog.author} added.`,
        classname: 'success'
      })
      )
    } catch (e) {
      dispatch(setMessage({ text: e.response.data.error, classname: 'error' }))
    }
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)
      dispatch({
        type: 'DELETE_BLOG',
        data: blog
      })
      dispatch(setMessage({
        text: `${blog.title} removed`,
        classname: 'success'
      }))
    } catch (e) {
      dispatch(setMessage({ text: e.response.data.error, classname: 'error' }))
    }
  }
}

export const likeBlog = (likedBlog) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.update({ ...likedBlog, likes: likedBlog.likes + 1 })
      dispatch({
        type: 'LIKE_BLOG',
        data: updatedBlog
      })
      dispatch(setMessage({
        text: `${updatedBlog.title} liked`,
        classname: 'success'
      }))
    } catch (e) {
      dispatch(setMessage({ text: e.response.data.error, classname: 'error' }))
    }
  }
}

export const newComment = (id, comment) => {
  return async dispatch => {
    try {
      const response = await commentService.create(id, comment)
      dispatch({
        type: 'NEW_COMMENT',
        data: response
      })
      dispatch(setMessage({
        text: 'Your comment has been saved',
        classname: 'success'
      }))
    } catch (e) {
      dispatch(setMessage({ text: e.response.data.error, classname: 'error' }))
    }

  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS' : {
    return action.data
  }

  case 'NEW_BLOG' : {
    return [...state, action.data]
  }

  case 'DELETE_BLOG': {
    return state.filter(blog => blog.id !== action.data.id)
  }

  case 'LIKE_BLOG': {
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  }

  case 'NEW_COMMENT': {
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  }

  default: return state
  }
}

export default reducer
