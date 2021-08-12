import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'


const Notification = () => {
  const message = useSelector(state => state.messages)

  if (message === null) return null

  return (
    <div>
      <Alert severity = {message.classname}>
        {message.text}
      </Alert>
    </div>

  )
}

export default Notification
