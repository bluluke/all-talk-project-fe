import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getChatsNames } from "../utils/api";
import { ChatCard } from './ChatCard';

export const ChatList = ({username}) => {
const [chatsNames, setChatsNames] = useState();
const [isLoading, setIsLoading] = useState(true)
useEffect(() => {
getChatsNames().then((data) => {
    setChatsNames(data)
    setIsLoading(false)

})
}, [])
if(isLoading) return <p>Loading... </p>;
return (
    <section id="chat-list-container">
        <ul id="chat-list">
           {chatsNames.map(({ _id, chatName, timeOfCreation, chatCreator}) => {

                return <Link to={`/chats/${_id}`} key={_id} className='chat-link'>
                    <ChatCard _id={_id} chatName={chatName} timeOfCreation={timeOfCreation} chatCreator={chatCreator} username={username}/>
                </Link>
           })}
        </ul>
    </section>
)
}
  
