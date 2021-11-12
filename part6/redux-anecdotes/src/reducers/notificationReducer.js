const reducer = (state='', action) => {
  switch(action.type){
    case'SET_MSG':
      return state=action.message
    case'RESET_MSG':
      return state=''  
    default:
      return state  
  }
}

export const setMessage = (message, count) => {
  return async dispatch => {
    dispatch({
      type:'SET_MSG',
      message: message}
    )
    setTimeout(() => dispatch({
        type: 'RESET_MSG'
      }), count*1000
    )
  }
}

export default reducer