import {useParams} from "react-router-dom";
import {useState, useEffect, useRef} from 'react';



export const SingleChat = ({username}) => {
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [ws, setWs] = useState(null);
    const isWebSocketConnected = useRef(false)
  
  
    useEffect(() => {
      if(!isWebSocketConnected.current) {
        isWebSocketConnected.current = true;
        const newWs = new WebSocket('wss://all-talk-api.onrender.com/websocket');
        newWs.onopen = () => {
          console.log('WebSocket connected');
          setWs(newWs)
        };
  
        newWs.onmessage = (event) => {
          const parsedEventData = JSON.parse(event.data);
          setMessageList((prevMessageList) => [...prevMessageList, parsedEventData])
        };
  
        newWs.onclose = () => {
          console.log('WebSocket disconnected')
        };
     }
    }, [isWebSocketConnected]);
  
    const handleSendMessage = (e) => {
      e.preventDefault()
       
      if(message.trim() !== '') {
        setMessageList((prevMessageList) => [...prevMessageList, { type: 'user_message', content: message, username: username }]);
        ws.send(JSON.stringify({ type: 'user_message', content: message, username: username }));
  
        setMessage('');
      }
    };
  
    return (
      <div>
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