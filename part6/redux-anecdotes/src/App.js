import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import anecdoteService from './services/anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import VisibilityFilter from './components/VisibilityFilter'
import { initializeAnecdotes } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAll()
      .then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
  },[dispatch])

  return (
    <div>
      <Notification />
      <VisibilityFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App