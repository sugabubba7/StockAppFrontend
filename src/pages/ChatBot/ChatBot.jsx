import React from 'react'
import AIChatBox from './AIChatBox'
import UserChatBox from './UserChatBox'

function ChatBot() {
  return (
    <div className='bg-gray-600 min-h-screen'>
      This is a ChatBot.
      <UserChatBox></UserChatBox>
      <UserChatBox></UserChatBox>
      <UserChatBox></UserChatBox>

      <AIChatBox></AIChatBox>
    </div>
  )
}

export default ChatBot
