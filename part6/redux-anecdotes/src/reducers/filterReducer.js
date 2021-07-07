const initialState = ''

export const setFilterAction = (content) => {
  return {
    type: 'SET_FILTER',
    content
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER': {
      return action.content
    }

    default: return state
  }
}

export default reducer
