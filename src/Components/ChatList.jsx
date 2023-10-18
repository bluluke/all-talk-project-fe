import { useState, useEffect } from 'react';
import { getChatsNames } from "../utils/api";
import { ChatCard } from './ChatCard';

export const ChatList = () => {
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
    <div>
        <ChatCard />
    </div>
)
}
  
