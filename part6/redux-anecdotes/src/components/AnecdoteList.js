import React from 'react'
import { connect } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { setMessageAction } from '../reducers/notificationReducer'

function AnecdoteList(props) {
  const sortByVotes = (a, b) => b.votes - a.votes

  const handleVote = (anecdote) => {
    props.voteAction(anecdote)
    props.setMessageAction(`you voted ${anecdote.content}`, 5)
  }

  return (
    <div>
      {props.anecdotes
        .sort(sortByVotes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes.filter(a => a.content.includes(state.filter))
  }
}

const mapDispatchToProps = {
  voteAction,
  setMessageAction
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList)

export default ConnectedAnecdoteList
