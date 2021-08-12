import React from 'react'
import { Link  as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

function Navbar() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => dispatch(logoutUser())

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        <Button color="inherit" component={RouterLink} to='/'>
          home
        </Button>
        <Button color="inherit" component={RouterLink} to='/users'>
          users
        </Button>
        {user
          ? <Button onClick={handleLogout} color="inherit" component={RouterLink} to='/'>logout</Button>
          : null
        }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
