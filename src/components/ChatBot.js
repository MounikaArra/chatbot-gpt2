import React, { useState } from 'react';
import Message from './Message';
import axios from "axios";

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const API_TOKEN = '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';

    const handleInput = (evt) => {
        if (evt.keyCode == 13) {
            evt.preventDefault();
            handleSendMessage();
        }
        setInput(evt.target.value);
    }

    const handleSendMessage = () => {
        if (input.trim()) {
            const newInput = { text: input, user: true };
            setMessages(msgs => [...msgs, newInput]);
            setInput('');

            //https://huggingface.co/docs/api-inference/detailed_parameters#conversational-task
            // const past_user_inputs = messages.filter(m => m.user).map(m => m.text);
            // const generated_responses = messages.filter(m => !m.user).map(m => m.text);
            var data = {
                "inputs": {
                    "past_user_inputs": [],
                    "generated_responses": [],
                    "text": input
                }
            }
            axios.post("https://api-inference.huggingface.co/models/microsoft/DialoGPT-large",
                data,
                {
                    headers: { Authorization: `Bearer ${API_TOKEN}` },
                }).then((res) => {
                    const response = res.data.conversation.generated_responses[0];
                    if (response) {
                        const reply = { text: response, user: false };
                        setMessages(msgs => [...msgs, reply]);
                    }
                });
        }
    };

    return (
        <div className='container'>
            <div className='msg-container'>
                {messages.map((message, index) => (
                    <Message key={index} text={message.text} user={message.user} />
                ))}
            </div>
            <div className="sendBar">
                <input id="inputMSG" type="text" value={input} placeholder="Type a message" onChange={handleInput} onKeyDown={handleInput} />
                <svg onClick={handleSendMessage} viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor"
                        d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path>
                </svg>
            </div>
        </div>
    )
}

export default ChatBot