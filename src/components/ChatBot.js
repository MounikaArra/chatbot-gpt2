import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';
import gptConvesation from '../services/Service';

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const messageContainerRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom when messages change
        messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }, [messages]);

    const handleInput = (evt) => {
        setInput(evt.target.value);
    }

    const handleKeyEnter = (evt) => {
        if (evt.keyCode === 13) {
            handleSendMessage();
        }
    }

    const handleSendMessage = () => {
        if (input.trim()) {
            gptConvesation(messages, input).then((res) => {
                const response = res.data.generated_text;

                if (response) {
                    const reply = { text: response, user: false };
                    setMessages(msgs => [...msgs, reply]);
                }
            });

            const newInput = { text: input, user: true };
            setMessages(msgs => [...msgs, newInput]);
            setInput('');
        }
    };

    return (
        <div className='container'>
            <div className='msg-container' ref={messageContainerRef}>
                {messages.map((message, index) => (
                    <Message key={index} text={message.text} user={message.user} />
                ))}
            </div>
            <div className="sendBar">
                <input id="inputMSG" type="text" value={input} placeholder="Enter a message.."
                    onChange={handleInput} onKeyDown={handleKeyEnter} />
                <svg onClick={handleSendMessage} viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor"
                        d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path>
                </svg>
            </div>
        </div>
    )
}

export default ChatBot