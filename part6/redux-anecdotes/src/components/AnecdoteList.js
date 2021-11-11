import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnacdote } from '../reducers/anecdoteReducer'

const AnecdoteItem = ({anecdote}) => {
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnacdote(id))
  }

  return (
    <div>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.sort((a, b) => a.votes<b.votes?1:-1))

  return (
    <div>
      <h2>Anecdote</h2>
      {anecdotes.map(anecdote => 
        <div key={anecdote.id}>
          <AnecdoteItem anecdote={anecdote} />
        </div>
      )}
    </div>
  )
}

export default AnecdoteList