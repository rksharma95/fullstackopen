import React from 'react'
import { connect } from 'react-redux'
import { voteAnacdote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const AnecdoteItem = ({anecdote, voteAnacdote, setMessage}) => {

  const vote = (anecdote) => {
    voteAnacdote(anecdote)
    setMessage(`you voted ${anecdote.content}`, 5)
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

const AnecdoteList = (props) => {
  const filter = props.filter
  const anecdotes = props.anecdotes.sort((a, b) => a.votes<b.votes?1:-1)
  

  const filteredAnecdotes = filter !== ''
    ? anecdotes.filter((anecdote) => 
        anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    : anecdotes
  return (
    <div>
      <h2>Anecdote</h2>
      {filteredAnecdotes.map(anecdote => 
        <div key={anecdote.id}>
          <AnecdoteItem 
            anecdote={anecdote}
            voteAnacdote={props.voteAnacdote}
            setMessage={props.setMessage} />
        </div>
      )}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    anecdotes: state.anecdotes
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    voteAnacdote: value => {
      dispatch(voteAnacdote(value))
    },
    setMessage: (message, count) => {
      dispatch(setMessage(message, count))
    }
  }
} 

const connectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default connectedAnecdoteList