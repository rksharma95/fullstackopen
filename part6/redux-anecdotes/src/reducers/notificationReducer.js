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

export const setMessage = (message) => {
  return {
    type:'SET_MSG',
    message: message
  }
}

export const resetMessage = () => {
  return{
    type: 'RESET_MSG'
  }
}

export default reducer