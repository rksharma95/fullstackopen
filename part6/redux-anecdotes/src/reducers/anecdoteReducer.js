import anecdoteService from '../services/anecdotes'

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
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(anecdote)
    dispatch(
      {
        type: 'NEW_ANECDOTE',
        data: newAnecdote
      }
    )
  }
}

export const voteAnacdote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.vote(anecdote)
    dispatch({
      type:'VOTE',
      data:{
        id:anecdote.id
      }
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type:'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer