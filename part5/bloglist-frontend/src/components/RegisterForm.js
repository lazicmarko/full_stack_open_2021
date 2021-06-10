import React, { useState } from 'react'
import userService from '../services/users'

function RegisterForm({ setMessage, resetMessage, blogFormRef }) {
  const [regName, setRegName] = useState('')
  const [regUsername, setRegUsername] = useState('')
  const [regPassword, setRegPassword] = useState('')

  const handleRegister = async (event) => {
    event.preventDefault()

    try {
      const user = await userService.register({
        name: regName,
        password: regPassword,
        username: regUsername
      })

      blogFormRef.current.toggleVisibility()
      setMessage({ text: `Successfully registered ${user.name}`, classname: 'success' })
      resetMessage()
      setRegName('')
      setRegPassword('')
      setRegUsername('')
    } catch (exception) {
      console.log(exception)
      setMessage({ text: exception.response.data.error, classname: 'error' })
      resetMessage()
    }
  }

  return (
    <div>
      <div>
        <h2>Register to application</h2>
        <form onSubmit={handleRegister}>
          <div>
          name
            <input
              type="text"
              value={regName}
              id='reg-name'
              onChange={({ target }) => setRegName(target.value)}
            />
          </div>
          <div>
          username
            <input
              type="text"
              value={regUsername}
              id='reg-username'
              onChange={({ target }) => setRegUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              type="password"
              value={regPassword}
              id='reg-password'
              onChange={({ target }) => setRegPassword(target.value)}
            />
          </div>
          <button id="register-button" type="submit">register</button>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm
