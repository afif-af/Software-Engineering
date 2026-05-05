import React, { useState } from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import { FiSend } from 'react-icons/fi';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! I'm your assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const sendMessage = () => {
        if (input.trim()) {
            const userMessage = { text: input, sender: 'user' };
            setMessages([...messages, userMessage]);
            setInput('');

            // Simulate bot response
            setTimeout(() => {
                const botResponse = getBotResponse();
                setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
            }, 1000);
        }
    };

    const getBotResponse = () => {
        // Simple mock responses
        const responses = [
            "That's interesting! Tell me more.",
            "I'm here to help. What else can I assist with?",
            "Thanks for your message. How can I support you?",
            "Got it! Is there anything specific you'd like to know?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={toggleChat}
                className="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg z-50"
            >
                <AiOutlineMessage size={24} />
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-20 right-5 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-lg z-50 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 bg-blue-500 text-white rounded-t-lg">
                        <h3 className="font-semibold">Chat Assistant</h3>
                        <button onClick={toggleChat} className="text-white hover:text-gray-200">
                            <IoClose size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`mb-2 p-2 rounded-lg max-w-xs ${
                                    msg.sender === 'user'
                                        ? 'bg-blue-500 text-white self-end ml-auto'
                                        : 'bg-gray-200 text-gray-800'
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-300 flex">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Type a message..."
                            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r-lg"
                        >
                            <FiSend size={20} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
