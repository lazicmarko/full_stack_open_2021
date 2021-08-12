import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'
import Navbar from './components/Navbar'
import User from './components/User'
import Users from './components/Users'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { Container, Typography } from '@material-ui/core'

const App = () => {
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const usersMatch = useRouteMatch('/users/:id')
  const blogsMatch = useRouteMatch('/blogs/:id')
  const matchingUser = usersMatch
    ? users.find(user => user.id === usersMatch.params.id)
    : null
  const matchingBlog = blogsMatch
    ? blogs.find(user => user.id === blogsMatch.params.id)
    : null

  useEffect(() => {
    dispatch(initializeBlogs())
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const userFromStorage = JSON.parse(loggedUserJSON)
      dispatch(setUser(userFromStorage))
      blogService.setToken(userFromStorage.token)
    }
  }, [])

  if(!user) {
    return (
      <Container>
        <Navbar/>
        <Typography
          variant="h1"
          component="h1"
          gutterBottom>
        Bloglist app
        </Typography>
        <Notification/>
        <Togglable buttonLabel = 'login'>
          <LoginForm/>
        </Togglable>
        <Togglable buttonLabel = 'register' ref={blogFormRef}>
          <RegisterForm blogFormRef = {blogFormRef}/>
        </Togglable>
      </Container>
    )
  }

  return (
    <Container>
      <Navbar/>
      <Typography
        variant="h1"
        component="h1"
        gutterBottom>
      Bloglist app
      </Typography>
      <Notification/>
      <Switch>
        <Route path='/blogs/:id'>
          <Blog blog={matchingBlog}/>
        </Route>
        <Route path='/users/:id'>
          <User user={matchingUser}/>
        </Route>
        <Route path='/users'>
          <Users/>
        </Route>
        <Route path='/'>
          <Togglable buttonLabel = 'new blog' ref={blogFormRef}>
            <NewBlogForm blogFormRef = {blogFormRef} />
          </Togglable>
          <Blogs/>
        </Route>
      </Switch>
    </Container>
  )
}

export default App
