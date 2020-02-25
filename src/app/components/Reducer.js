const Reducer = (state, action) => {
  switch (action.type) {
  case 'SET_RESULTS':
    return {
      ...state,
      results: action.payload
    }
  case 'SET_ERROR':
    return {
      ...state,
      error: action.payload
    }
  default:
    return state
  }
}

export default Reducer