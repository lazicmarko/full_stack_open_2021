import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  const fetchBlogs = () => {
    blogService.getAll()
      .then(blogs =>
        setBlogs( blogs )
      )
      .catch(error => {
        setMessage({ text: 'Could not connect to server', classname: 'error' })
        console.log(error)
        resetMessage()
      })
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const resetMessage = () => setTimeout(() => setMessage(null), 5000)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setMessage({ text: `Welcome ${user.name}`, classname: 'success' })
      resetMessage()
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({ text: exception.response.data.error, classname: 'error' })
      resetMessage()
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setMessage({ text: 'Successfully logged out', classname: 'success' })
    resetMessage()
  }

  if(!user) {
    return (
      <div>
        <h1>Bloglist app</h1>
        <Notification message = {message}/>
        <Togglable buttonLabel = 'login'>
          <LoginForm
            username = {username}
            setUsername = {setUsername}
            password = {password}
            setPassword = {setPassword}
            handleLogin = {handleLogin}
          />
        </Togglable>
        <Togglable buttonLabel = 'register' ref={blogFormRef}>
          <RegisterForm
            setMessage = {setMessage}
            resetMessage = {resetMessage}
            blogFormRef = {blogFormRef}
          />
        </Togglable>
      </div>
    )
  } else {
    return (
      <div>
        <div>
          <h1>Bloglist app</h1>
          <Notification message = {message}/>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>
        <Togglable buttonLabel = 'new blog' ref={blogFormRef}>
          <NewBlogForm
            blogs = {blogs}
            setBlogs = {setBlogs}
            setMessage = {setMessage}
            resetMessage = {resetMessage}
            blogFormRef = {blogFormRef}
          />
        </Togglable>
        <Blogs
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
          setMessage={setMessage}
          resetMessage={resetMessage}
        />
      </div>
    )
  }
}

export default App
