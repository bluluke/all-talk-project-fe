import {useParams} from "react-router-dom";
import {useState, useEffect, useRef, useContext} from 'react';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {UserContext} from '../contexts/User'
import { getSingleChat, postMessage, patchMessage } from "../utils/api";
import { MessageList } from "./MessageList";
import { generateMongoObjectId, deleteMessage } from "../utils/api";

export const SingleChat = () => {
    const { chatid } = useParams(); 
    const [chatData, setChatData] = useState()
    const [isLoading, setIsLoading ] = useState(true)
    const [editInProgress, setEditInProgress] = useState(false);   
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [idOfMessageToEdit, setIdOfMessageToEdit] = useState('');
    const [idOfMessageBeingEdited, setIdOfMessageBeingEdited] = useState('');
    const [idOfMessageCardButtonsShown, setIdOfMessageCardButtonsShown] = useState('')
    const [showButtons, setShowButtons] = useState(false);
    const [deleteInProgress, setDeleteInProgress] = useState(false);
    const [idOfMessageToDelete, setIdOfMessageToDelete] = useState('')
    const [messageSent, setMessageSent] = useState(false);
    const user = useContext(UserContext)
    const [ws, setWs] = useState(null);
    const isWebSocketConnected = useRef(false)
  
    const nonWhiteSpaceCharactersRegex = /[^ ]/; 
    const onlyWhiteSpaceCharactersPresentRegex = /^\s+$/;

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
            setMessageSent((previousValue) => {
              return !previousValue;
            });
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
  

    const handleSendMessageError = () => {
      toast('There was a problem. Message was not sent.', {
        position: 'top-center',
        bodyClassName: 'toastBody'
      });
    };
    const handleSendMessage = (e) => {
        e.preventDefault()
        if(message.trim() !== '') {
          const timeNow = Date.now();
          const objectId = generateMongoObjectId();
          const timeOfSending = { $timestamp: { t: timeNow, i: 0 }};
          postMessage(chatid, objectId, user.user, message, timeOfSending)
          .then(() => {
            setMessageList((prevMessageList) => [...prevMessageList, { _id: objectId, type: 'user_message', messageContent: message, senderName: user.user, timeOfSending: { $timestamp: { t: timeNow, i: 0 }}}]);
            ws.send(JSON.stringify({ _id: objectId, type: 'user_message', messageContent: message, senderName: user.user, timeOfSending: { $timestamp: { t: timeNow, i: 0 }}}));
            setMessage('');
          })
          .then(() => {
            setMessageSent((previousValue) => {
              return !previousValue;
            });
          })
          .catch((error) => {
            handleSendMessageError()
          })
        }
    };

    const handleEditError = () => {   
      toast("There was a problem. Message was not edited.", {
          position: "top-center",
          bodyClassName: 'toastBody',
      });
  };
    const handleEditMessage = (messageId, newMessageContent) => {
      patchMessage(chatid, messageId, newMessageContent)
      .then((data) => {
        getSingleChat(chatid).then((updatedChatData) => {
          setMessageList(updatedChatData.messages)
          setEditInProgress(false)  
          setIdOfMessageToEdit('')
          setIdOfMessageCardButtonsShown('')
          setShowButtons(false)
        })
      })
      .catch((error) => {
        handleEditError()   
        setEditInProgress(false);
        setIdOfMessageToEdit(null)
      })
    }

    const handleDeleteError = () => {
      toast("There was a problem. Message was not deleted.", {
        position: "top-center",
        bodyClassName: "toastBody"
      })
    }
    const handleDeleteMessage = (_id) => {
      deleteMessage(chatid, _id).then(() => {
          getSingleChat(chatid).then((singleChatData) => {
              setMessageList(singleChatData.messages)
              setDeleteInProgress(false)
              setIdOfMessageToDelete(false);
          })
          .then(() => {
            ws.send(JSON.stringify({ type: 'delete_message', _id: _id}))
          })
      })
      .catch((error) => {
        handleDeleteError();
      })
    }
    if(isLoading) return <p className="loading-feedback">Loading... </p>
      return (
        <div>
          <div id="chat-container">
              <nav id="single-chat-nav">
                <h2 className="single-chat-name">{chatData.chatName}</h2>
                <Link to={'/'} className='home-link'>
                  <p id="home-nav">Home</p>
                </Link>
              </nav>
              <h3 id="chat-creator">Created by {chatData.chatCreator}</h3>
              <form id="message-form">
                  <input id="message-box" placeholder="write message here" value={message} onChange={(e) => setMessage(e.target.value)}></input>
                  {nonWhiteSpaceCharactersRegex.test(message) && 
                    <button id="submit-message" onClick={handleSendMessage}>Submit</button>
                  }
                  {onlyWhiteSpaceCharactersPresentRegex.test(message) && 
                        <p className="enter-non-whistespace-prompt-new-message">Please enter a non-whitespace character</p>
                  }
              </form>
              {messageList.length !== 0 &&
                 <MessageList chatid={chatid} messageList={messageList} setMessageList={setMessageList} handleDeleteMessage={handleDeleteMessage} handleEditMessage={handleEditMessage} setEditInProgress={setEditInProgress} editInProgress={editInProgress} idOfMessageToEdit={idOfMessageToEdit} setIdOfMessageToEdit={setIdOfMessageToEdit} idOfMessageBeingEdited={idOfMessageBeingEdited} setIdOfMessageBeingEdited={setIdOfMessageBeingEdited} idOfMessageCardButtonsShown={idOfMessageCardButtonsShown} setIdOfMessageCardButtonsShown={ setIdOfMessageCardButtonsShown} showButtons={showButtons} setShowButtons={setShowButtons} deleteInProgress={deleteInProgress} setDeleteInProgress={setDeleteInProgress} idOfMessageToDelete={idOfMessageToDelete} setIdOfMessageToDelete={setIdOfMessageToDelete} messageSent={messageSent} setMessageSent={setMessageSent}/>
              }
          </div> 
        </div>
      )
}