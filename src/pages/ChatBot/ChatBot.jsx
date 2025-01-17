import React, { useState } from 'react';
import AIChatBox from './AIChatBox';
import UserChatBox from './UserChatBox';
import PromptBox from './PromptBox';

function ChatBot() {
  const [messages, setMessages] = useState([]);

  const handleUserSubmit = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', message },
    ]);

    setTimeout(() => {
      const aiResponse = "This is the AI's response to: " + message;
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'AI', message: aiResponse },
      ]);
    }, 1000); 
  };

  return (
    <div className='bg-gray-600 min-h-screen'>
      <h1 className='text-white p-4'>This is a ChatBot.</h1>

      {messages.map((msg, index) => {
        if (msg.sender === 'user') {
          return <UserChatBox key={index} message={msg.message} />;
        } else if (msg.sender === 'AI') {
          return <AIChatBox key={index} message={msg.message} />;
        }
        return null;
      })}

      <PromptBox onSubmit={handleUserSubmit} />
    </div>
  );
}

export default ChatBot;
