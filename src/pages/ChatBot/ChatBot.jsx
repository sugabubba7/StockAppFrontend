import React, { useState, useEffect, useRef } from "react";
import AIChatBox from "./AIChatBox";
import UserChatBox from "./UserChatBox";
import PromptBox from "./PromptBox";

function ChatBot() {
  const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDt6aRuVYjf2dWD7nITIZTw3Un90eL-wTE";
  
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  async function generateResponse(message) {
    setIsLoading(true);

    const summarizedMessage = `You are a friendly and helpful chatbot. Respond concisely and accurately. Query: ${message}`;
    let RequestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: summarizedMessage }] }] }),
    };

    try {
      let response = await fetch(API_URL, RequestOption);
      let data = await response.json();
      let apiResponse = data.candidates[0].content.parts[0].text.trim();
      setMessages((prevMessages) => [...prevMessages, { sender: "AI", message: apiResponse }]);
    } catch (error) {
      setMessages((prevMessages) => [...prevMessages, { sender: "AI", message: "Error fetching AI response." }]);
    }
    
    setIsLoading(false);
  }

  const handleUserSubmit = (message) => {
    setMessages((prevMessages) => [...prevMessages, { sender: "user", message }]);
    generateResponse(message);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col text-gray-800">
      <h1 className="text-3xl font-semibold p-6 text-center text-gray-900">Classic AI ChatBot</h1>
      
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 pb-28 max-h-[calc(100vh-150px)]">
        {messages.map((msg, index) => (
          msg.sender === 'user' ? (
            <UserChatBox key={index} message={msg.message} />
          ) : (
            <AIChatBox key={index} message={msg.message} isLoading={false} />
          )
        ))}
        
        {isLoading && <AIChatBox message="AI is thinking..." isLoading={true} />}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-4">
        <PromptBox onSubmit={handleUserSubmit} />
      </div>
    </div>
  );
}

export default ChatBot;
