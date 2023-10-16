import './App.css'
import React, { useEffect, useState } from 'react';
import { Header } from './Components/Header'


function App() {
  const [message, setMessage] = useState('');
  const ws = new WebSocket('ws://localhost:9020/websocket');
  useEffect(() => {
    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      console.log('Received message:', event.data);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected')
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault()
    if(message.trim() !== '') {
      ws.send(JSON.stringify({ type: 'user_message', content: message }));

      setMessage('');
    }
  };

  return (
    <div>
      <Header />
      <div id="chat-container">
          <h2>Chat Name</h2>
          <div id="messages-container">

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
