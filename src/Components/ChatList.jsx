import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { ChatCard } from './ChatCard';
import { deleteChat, getChatsNames } from "../utils/api"


export const ChatList = ({username, setChatsNames, chatsNames, idOfChatToDelete, setIdOfChatToDelete}) => {
const [isLoading, setIsLoading] = useState(true)
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
if(isLoading) return <p>Loading... </p>;
return (
    <section id="chat-list-container">
        <ul id="chat-list">
           {chatsNames.map(({ _id, chatName, timeOfCreation, chatCreator}) => {
                if(idOfChatToDelete === _id) return <p>{chatName} chat is being deleted...</p>
                return <div key={_id}>
                    <Link to={`/chats/${_id}`} key={_id} className='chat-link'>
                        <ChatCard _id={_id} chatName={chatName} timeOfCreation={timeOfCreation} chatCreator={chatCreator} username={username} setChatsNames={setChatsNames}/>
                     </Link>
                    {chatCreator === username && ( 
                        <button onClick={() => handleDeletechat(_id)}>Delete</button>
                    )} 
                </div>
           })}
        </ul>
    </section>
)
}
  

