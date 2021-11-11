const reducer = (state='', action) => {
  switch(action.type){
    case'SET_FILTER':
      return state=action.filter
    default:
      return state  
  }
}

export const setFilter = (filter) => {
  return {
    type:'SET_FILTER',
    filter:filter
  }
}

export default reducer