import React from 'react'
import { connect } from 'react-redux'
import { newAnecdoteAction } from '../reducers/anecdoteReducer';
import { setMessageAction } from '../reducers/notificationReducer';

function AnecdoteForm(props) {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.newAnecdoteAction(content)
    props.setMessageAction(`new anecdote ${content}`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  newAnecdoteAction,
  setMessageAction
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm
