import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'
import { setMessage } from './notificationReducer'

export const loginUser = (user) => {
  return async dispatch => {
    try {
      const response = await loginService.login(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(response))
      blogService.setToken(response.token)
      dispatch({
        type: 'LOGIN_USER',
        data: response
      })
      dispatch(setMessage({
        text: `Welcome ${response.name}`,
        classname: 'success' })
      )
    } catch (e) {
      dispatch(setMessage({ text: e.response.data.error, classname: 'error' }))
    }
  }
}

export const registerUser = (user) => {
  return async dispatch => {
    try {
      const response = await userService.register(user)
      dispatch({
        type: 'REGISTER_USER',
        data: response
      })
      dispatch(setMessage({
        text: `Successfully registered ${response.name}`,
        classname: 'success'
      }))
    } catch (e) {
      dispatch(setMessage({ text: e.response.data.error, classname: 'error' }))
    }
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedUser')
    dispatch({
      type: 'LOGOUT_USER'
    })
    dispatch(setMessage({
      text: 'Successfully logged out',
      classname: 'success'
    }))
  }
}

const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN_USER':
    return action.data

  case 'SET_USER':
    return action.data

  case 'LOGOUT_USER':
    return initialState

  default: return state
  }
}

export default reducer
