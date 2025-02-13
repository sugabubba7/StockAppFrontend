import React, { useState } from "react";
import AIChatBox from "./AIChatBox";
import UserChatBox from "./UserChatBox";
import PromptBox from "./PromptBox";
import Header from "@/components/Header";

function ChatBot() {
  const API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDt6aRuVYjf2dWD7nITIZTw3Un90eL-wTE";

  async function generateResponse(message) {
    const summarizedMessage = ` You are a friendly and helpful chatbot. Respond in a concise and user-friendly way:
                                	- For technical or doubt-related queries, provide accurate and concise answers in a single sentence.
                                  - For casual or personal interactions like “Hello” or “How are you,” respond in a friendly and conversational manner, like a human.
                                  - For stock market-related questions, use highly technical financial and trading terms but explain them in an easy-to-understand way.

                                Query: ${message}`;
    let RequestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: summarizedMessage }],
          },
        ],
      }),
    };

    try {
      let response = await fetch(API_URL, RequestOption);
      let data = await response.json();
      let apiResponse = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();

      console.log(apiResponse);

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "AI", message: apiResponse },
      ]);
    } catch (error) {
      console.log(error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "AI", message: "Error fetching AI response." },
      ]);
    }
  }

  const [messages, setMessages] = useState([]);

  const handleUserSubmit = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", message },
    ]);

    generateResponse(message);
  };

  return (

    <div className="bg-gray-100 min-h-screen flex flex-col justify-between text-gray-800">
      <h1 className="text-3xl font-semibold p-6 text-center text-gray-900">StockBot2000</h1>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => {
          if (msg.sender === 'user') {
            return (
              <UserChatBox
                key={index}
                message={msg.message}
                className="mb-3 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm"
              />
            );
          } else if (msg.sender === 'AI') {
            return (
              <AIChatBox
                key={index}
                message={msg.message}
                className="mb-3 bg-gray-50 text-gray-700 border border-gray-300 rounded-lg shadow-sm"
              />
            );
          }
          return null;
        })}
      </div>
    

      <PromptBox
        onSubmit={handleUserSubmit}
        className="bg-gray-300 hover:bg-gray-400 transition-all duration-300 text-gray-900 font-semibold p-3 rounded-lg shadow-md"
      />
    </div>
  );
}

export default ChatBot;



