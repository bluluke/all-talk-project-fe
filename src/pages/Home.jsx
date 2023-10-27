import { useState } from 'react';
import { ChatList } from "../Components/ChatList"
import { getChatsNames, postChat } from "../utils/api"

export const Home = ({username}) => {
    const [chatsNames, setChatsNames] = useState();
    const [newChatName, setNewChatName] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const handleCreateChat = (e) => {
        e.preventDefault();
        postChat(newChatName, username).then(() => {
            setIsLoading(true)
            setNewChatName('')
            getChatsNames().then((chatsNamesData) => {
            setChatsNames(chatsNamesData);
            setIsLoading(false)
            })
        })
        
    }
    if (isLoading) return ( <p>Loading...</p> )
    return (
        <div>
            <h3>Choose a chat to join</h3>
            <form>
                <input
                type="text"
                value={newChatName}
                onChange={((e) => setNewChatName(e.target.value))}
                >    
                </input>
                <button onClick={handleCreateChat}>Click to create a new chat</button>
            </form>
            <ChatList username={username} setChatsNames={setChatsNames} chatsNames={chatsNames}/>
        </div>
    )
}