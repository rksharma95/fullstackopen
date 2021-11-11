import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const VisibilityFilter = () => {
  const dispatch = useDispatch()

  const changeFilter = (event) => {
    dispatch(setFilter(event.target.value))
  }

  return (
    <div>
        filter
        <input 
          onChange={(e) => changeFilter(e)}
        />
    </div>
  )
}

export default VisibilityFilter