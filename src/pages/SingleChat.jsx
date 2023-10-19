import {useParams} from "react-router-dom";
import {useState, useEffect, useRef} from 'react';
import { getSingleChat } from "../utils/api";


export const SingleChat = ({username}) => {

    const { chatid } = useParams(); 
    const [chatData, setChatData] = useState()
    const [isLoading, setIsLoading ] = useState(true)
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [ws, setWs] = useState(null);
    const isWebSocketConnected = useRef(false)
  
  
    useEffect(() => {
      getSingleChat(chatid).then((singleChatData) => {
        setChatData(singleChatData)
        setMessageList(singleChatData.messages)
        setIsLoading(false)
      })
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
        setMessageList((prevMessageList) => [...prevMessageList, { type: 'user_message', messageContent: message, senderName: username, timeOfSending: Date.now() }]);
        ws.send(JSON.stringify({ type: 'user_message', messageContent: message, senderName: username, timeOfSending: Date.now() }));
  
        setMessage('');
      }
    };
  
    if(isLoading) return <p>Loading... </p>
    console.log('MessageList: ', messageList);
    return (
      <div>
        <div id="chat-container">
            <h2>{chatData.chatName}</h2>
            <h3>Created by {chatData.chatCreator}</h3>
            <div id="messages-container">
              {messageList.map((message, index) => (
                <p key={index}>{message.senderName}: {message.messageContent}</p>
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