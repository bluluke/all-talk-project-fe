import './App.css'
import React, { useEffect } from 'react';
import { Header } from './Components/Header'


function App() {
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:9020/websocket');

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

  return (
    <div>
      <Header />
      <div id="chat-container">
          <h2>Chat Name</h2>
          <div id="messages-container">

          </div>
          <form id="message-form">
              <input id="message-box" placeholder="write message here"></input>
              <button id="submit-message">Submit</button>
          </form>
      </div> 
    </div>
  )
}

export default App
