import React from 'react'
import { registerUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import useField from '../hooks/useField'
import handleReset from '../utilities/resetFields'
import { Button, TextField, Typography } from '@material-ui/core'

function RegisterForm({ blogFormRef }) {
  const dispatch = useDispatch()
  const regName = useField('text', 'reg-name')
  const regUsername = useField('text', 'reg-username')
  const regPassword = useField('password', 'reg-password')
  const fields = [regName, regUsername, regPassword]

  const handleRegister = async (event) => {
    event.preventDefault()

    const user = {
      name: regName.value,
      password: regPassword.value,
      username: regUsername.value
    }

    dispatch(registerUser(user))
    blogFormRef.current.toggleVisibility()
    handleReset(fields)
  }

  return (
    <div>
      <Typography
        variant="h2"
        component="h2"
        gutterBottom>
        Register an account
      </Typography>
      <form onSubmit={handleRegister} autoComplete="off">
        <TextField variant="outlined" fullWidth label="name" {...regName} reset={null} />
        <TextField variant="outlined" fullWidth label="username" {...regUsername} reset={null} />
        <TextField variant="outlined" fullWidth label="password" {...regPassword} reset={null} />
        <Button variant="outlined" color="primary" id="register-button" type="submit">register</Button>
      </form>
    </div>
  )
}

export default RegisterForm
