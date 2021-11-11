import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnacdote } from '../reducers/anecdoteReducer'
import { setMessage, resetMessage } from '../reducers/notificationReducer'

const AnecdoteItem = ({anecdote}) => {
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnacdote(anecdote.id))
    dispatch(setMessage(`you voted ${anecdote.content}`))
    setTimeout(() => {
      dispatch(resetMessage())
    }, 5000)
  }

  return (
    <div>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({anecdotes}) => anecdotes.sort((a, b) => a.votes<b.votes?1:-1))

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