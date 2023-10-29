import {useParams} from "react-router-dom";
import {useState, useEffect, useRef} from 'react';
import { getSingleChat, postMessage, patchMessage } from "../utils/api";
import { MessageList } from "./MessageList";
import { generateMongoObjectId, deleteMessage } from "../utils/api";
export const SingleChat = ({username}) => {

    const { chatid } = useParams(); 
    const [chatData, setChatData] = useState()
    const [isLoading, setIsLoading ] = useState(true)
    const [editInProgress, setEditInProgress] = useState(false);   
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [idOfMessageToEdit, setIdOfMessageToEdit] = useState('');
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
          if(parsedEventData.type === 'user_message') {
            setMessageList((prevMessageList) => [...prevMessageList, parsedEventData])
          } if(parsedEventData.type === 'delete_message') {
            setMessageList((previousMessageList) => {
              const updatedMessageList = previousMessageList.filter((message) => {
                return message._id !== parsedEventData._id;
              })
              return updatedMessageList
            })
          }
        };
        newWs.onclose = () => {
          console.log('WebSocket disconnected')
        };
     }
    }, [isWebSocketConnected, messageList]);
  
    const handleSendMessage = (e) => {
      e.preventDefault()
      if(message.trim() !== '') {
        const timeNow = Date.now();
        const objectId = generateMongoObjectId();
        const timeOfSending = { $timestamp: { t: timeNow, i: 0 }};
        postMessage(chatid, objectId, username, message, timeOfSending)
        .then(() => {
          setMessageList((prevMessageList) => [...prevMessageList, { _id: objectId, type: 'user_message', messageContent: message, senderName: username, timeOfSending: { $timestamp: { t: timeNow, i: 0 }}}]);
          ws.send(JSON.stringify({ _id: objectId, type: 'user_message', messageContent: message, senderName: username, timeOfSending: { $timestamp: { t: timeNow, i: 0 }}}));
          setMessage('');
        })
      }
    };
    const handleEditMessage = (messageId, newMessageContent) => {
      patchMessage(chatid, messageId, newMessageContent)
      .then(() => {
        getSingleChat(chatid).then((updatedChatData) => {
          setMessageList(updatedChatData.messages)
          setEditInProgress(false)  
          setIdOfMessageToEdit('')
        })
      })
    }
    const handleDeleteMessage = (_id) => {
      deleteMessage(chatid, _id).then(() => {
          getSingleChat(chatid).then((singleChatData) => {
              setMessageList(singleChatData.messages)
          })
          .then(() => {
            ws.send(JSON.stringify({ type: 'delete_message', _id: _id}))
          })
      })
    }
    if(isLoading) return <p>Loading... </p>
      return (
        <div>
          <div id="chat-container">
              <h2>{chatData.chatName}</h2>
              <h3>Created by {chatData.chatCreator}</h3>
              <MessageList chatid={chatid} messageList={messageList} setMessageList={setMessageList} username={username} handleDeleteMessage={handleDeleteMessage} handleEditMessage={handleEditMessage} setEditInProgress={setEditInProgress} editInProgress={editInProgress} idOfMessageToEdit={idOfMessageToEdit} setIdOfMessageToEdit={setIdOfMessageToEdit}/>
              <form id="message-form">
                  <input id="message-box" placeholder="write message here" value={message} onChange={(e) => setMessage(e.target.value)}></input>
                  <button id="submit-message" onClick={handleSendMessage}>Submit</button>
              </form>
          </div> 
        </div>
      )
}