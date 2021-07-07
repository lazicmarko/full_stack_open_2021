let timeoutID

export const setMessageAction = (content, displayInSeconds) => {
  return async dispatch => {
    if(timeoutID) clearInterval(timeoutID)

    dispatch({
      type: 'SET_MESSAGE',
      content
    })

    timeoutID = setTimeout(() => {
      dispatch({
        type: 'RESET_MESSAGE'
      })
    }, displayInSeconds * 1000)

    console.log(timeoutID);
  }
}

export const resetMessageAction = () => {
  return {
    type: 'RESET_MESSAGE'
  }
}

const initialState = ''

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_MESSAGE': {
      return action.content
    }

    case 'RESET_MESSAGE': {
      return initialState
    }

    default: return state
  }
}

export default reducer
