import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    props.messages !== ''
    ? <div style={style}>
        {props.messages}
      </div>
    : null
  )
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
