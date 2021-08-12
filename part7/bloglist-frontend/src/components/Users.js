import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { getUsers } from '../reducers/usersReducer'
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Link,
  Typography
} from '@material-ui/core'

function Users() {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  if(!users) {
    return null
  }

  return (
    <div>
      <Typography variant="h2" component="h2" gutterBottom>
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Number of blogs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link component={RouterLink} to={`/users/${user.id}`}>{user.username}</Link>
                </TableCell>
                <TableCell>
                  {user.blogs.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users
