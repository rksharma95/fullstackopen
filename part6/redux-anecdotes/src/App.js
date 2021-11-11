import React from 'react'
import { voteAnacdote, createAnecdote } from './reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'


const App = () => {
  const anecdotes = useSelector(state => state.sort((a, b) => a.votes<b.votes?1:-1))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnacdote(id))
  }

  const createNew = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(anecdote))
  }
  

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <div>
        <h2>create new</h2>
        <form onSubmit={createNew}>
          <div><input name='anecdote'/></div>
          <button type='submit'>create</button>
        </form>
      </div>
    </div>
  )
}

export default App