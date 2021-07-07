import anecdoteService from '../services/anecdotes'

export const getId = () => (100000 * Math.random()).toFixed(0)

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const voteAction = (anecdote) => {
  return async dispatch => {
    const anecdoteToChange = { ...anecdote, votes: anecdote.votes + 1 }
    const updated = await anecdoteService.update(anecdoteToChange)
    dispatch({
      type: 'VOTE',
      data: {
        id: anecdote.id
      }
    })
  }
}

export const newAnecdoteAction = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote
    })
  }
}

// const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      return state.map(anecdote => anecdote.id !== id ? anecdote: changedAnecdote)
    }

    case 'NEW_ANECDOTE': {
      return [...state, action.data]
    }

    case 'INIT_ANECDOTES': {
      return action.data
    }


    default: return state
  }

}

export default reducer
