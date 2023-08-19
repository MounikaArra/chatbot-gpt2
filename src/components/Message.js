import React from 'react'

const Message = ({text, user}) => {
  return (
    <div className={`message ${user ? 'user' : 'bot'}`}>{text}</div>
  )
}

export default Message