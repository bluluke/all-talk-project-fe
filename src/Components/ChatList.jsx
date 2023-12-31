import { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from '../contexts/User'
import { ChatCard } from './ChatCard';
import { deleteChat, getChatsNames } from "../utils/api"


export const ChatList = ({ setChatsNames, chatsNames, idOfChatToDelete, setIdOfChatToDelete, setIsLoading, isLoading}) => {
const user = useContext(UserContext)
useEffect(() => {
getChatsNames().then((data) => {
    setChatsNames(data)
    setIsLoading(false)
})
}, [])
const handleDeleteChatError = () => {
    toast("There was a problem. Chat was not deleted.", {
        position: "top-center",
        bodyClassName: "toastBody",
    })
}
const handleDeletechat = (_id) => {
    deleteChat(_id).then(() => {
        setIdOfChatToDelete(_id)
        getChatsNames().then((chatNamesData) => {
           setChatsNames(chatNamesData)
           setIdOfChatToDelete('');
        })
    })
    .catch((error) => {
        handleDeleteChatError()
        setIdOfChatToDelete('')
    })
}
if(isLoading) return <p className="loading-feedback">Loading... </p>;
return (
    <section id="chat-list-container">
        <h2 id="click-chat-instruction">Click a chat to join</h2>
        <ul id="chat-list">
           {chatsNames.map(({ _id, chatName, timeOfCreation, chatCreator}) => {
                if(idOfChatToDelete === _id) return <p key={_id}>{chatName} chat is being deleted...</p>
                return <div key={_id} className="chat-card-container">
                    <Link to={`/chats/${_id}`} className='chat-link'>
                        <ChatCard _id={_id} chatName={chatName} timeOfCreation={timeOfCreation} chatCreator={chatCreator} setChatsNames={setChatsNames}/>
                     </Link>
                    {chatCreator === user.user && ( 
                        <button className="delete-chat-button" onClick={() => handleDeletechat(_id)}>Delete</button>
                    )} 
                </div>
           })}
        </ul>
    </section>
)
}
  

