import React from 'react'
import useField from '../hooks/useField'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import handleReset from '../utilities/resetFields'
import { Button, TextField, Typography } from '@material-ui/core'

const LoginForm = () => {
  const dispatch = useDispatch()
  const username = useField('text', 'username')
  const password = useField('password', 'password')
  const fields = [username, password]

  const handleLogin = async (event) => {
    event.preventDefault()

    const user = {
      username: username.value,
      password: password.value
    }

    dispatch(loginUser(user))
    handleReset(fields)
  }

  return (
    <div>
      <Typography
        variant="h2"
        component="h2"
        gutterBottom>
        Log in to application
      </Typography>
      <form onSubmit={handleLogin} autoComplete="off">
        <TextField variant="outlined" fullWidth {...username} label="username" reset={null} />
        <TextField variant="outlined" fullWidth {...password} label="password" reset={null} />
        <Button id="login-button" variant="outlined" color="primary" type="submit">login</Button>
      </form>
    </div>
  )
}

export default LoginForm
