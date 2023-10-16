import './App.css'
import React, { useEffect, useState } from 'react';
import { Header } from './Components/Header'

const username = prompt('Tell us your name!');

function App() {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const ws = new WebSocket('ws://localhost:9020/websocket');
  useEffect(() => {
    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const parsedEventData = JSON.parse(event.data);
      setMessageList((prevMessageList) => [...prevMessageList, { type: parsedEventData.type, content: parsedEventData.content, username: parsedEventData.username }]);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected')
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault()
    if(message.trim() !== '') {
      ws.send(JSON.stringify({ type: 'user_message', content: message, username: username }));

      setMessage('');
      console.log('messageList: ', messageList);
    }
  };

  return (
    <div>
      <Header />
      <div id="chat-container">
          <h2>Chat Name</h2>
          <div id="messages-container">
            {messageList.map((message, index) => (
              <p key={index}>{message.username}: {message.content}</p>
            ))}
          </div>
          <form id="message-form">
              <input id="message-box" placeholder="write message here" value={message} onChange={(e) => setMessage(e.target.value)}></input>
              <button id="submit-message" onClick={handleSendMessage}>Submit</button>
          </form>
      </div> 
    </div>
  )
}

export default App
