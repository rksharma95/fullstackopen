
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.message
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    notification !== '' ? <div style={style}>
      {notification}
    </div> : null
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}

const connectedNotification = connect(mapStateToProps)(Notification)
export default connectedNotification