import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ChatCard } from './ChatCard';
import { deleteChat, getChatsNames } from "../utils/api"


export const ChatList = ({username, setChatsNames, chatsNames}) => {
const [isLoading, setIsLoading] = useState(true)
useEffect(() => {
getChatsNames().then((data) => {
    setChatsNames(data)
    setIsLoading(false)
})
}, [])
const handleDeletechat = (_id) => {
    deleteChat(_id).then(() => {
        getChatsNames().then((chatNamesData) => {
           setChatsNames(chatNamesData)
        })
    })
}
if(isLoading) return <p>Loading... </p>;
return (
    <section id="chat-list-container">
        <ul id="chat-list">
           {chatsNames.map(({ _id, chatName, timeOfCreation, chatCreator}) => {

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
  
