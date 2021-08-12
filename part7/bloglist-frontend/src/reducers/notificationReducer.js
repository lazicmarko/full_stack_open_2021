let timeoutID

export const setMessage = ({ text, classname }) => {
  const DISPLAY_DURATION = 5000

  return async dispatch => {
    if(timeoutID) clearInterval(timeoutID)

    dispatch({
      type: 'SET_MESSAGE',
      data: {
        text,
        classname
      }
    })

    timeoutID = setTimeout(() => {
      dispatch({
        type: 'RESET_MESSAGE'
      })
    }, DISPLAY_DURATION)
  }
}

const initialState = null

const reducer = (state = initialState, action) => {
  switch(action.type) {
  case 'SET_MESSAGE' : {
    return {
      text: action.data.text,
      classname: action.data.classname
    }
  }
  case 'RESET_MESSAGE' : {
    return initialState
  }

  default: return state
  }
}

export default reducer
