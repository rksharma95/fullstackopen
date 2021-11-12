// const getId = () => (100000 * Math.random()).toFixed(0)

const reducer = (state=[], action) => {

  switch(action.type){
    case 'VOTE':
      const id = action.data.id
      const toVote = state.find(n => n.id === id)
      const voted = {
        ...toVote,
        votes: toVote.votes + 1
      }
      return state.map(n => 
        n.id === id ? voted : n  
      )

    case 'NEW_ANECDOTE':
      return [...state, action.data]

    case 'INIT_ANECDOTES':
      return state = action.data  

    default:
      return state  
  }
}
export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: anecdote
  }
}

export const voteAnacdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return{
    type:'INIT_ANECDOTES',
    data: anecdotes
  }
}

export default reducer