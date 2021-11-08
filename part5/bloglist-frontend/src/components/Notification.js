import React from 'react'

const error = {
  color: 'red',
  background: 'lightGrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius:'5px',
  padding:'10px',
  marginBottom:'10px'
}

const success = { ...error, color:'green' }

const Notification = ({ message, isError }) => {
  if(message === null){
    return null
  }
  return (
    <div style={isError?error:success}>
      {message}
    </div>
  )
}

export default Notification