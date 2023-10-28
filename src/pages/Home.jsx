import { useState } from 'react';
import { ChatList } from "../Components/ChatList"
import { getChatsNames, postChat } from "../utils/api"

export const Home = ({username}) => {
    const [chatsNames, setChatsNames] = useState();
    const [newChatName, setNewChatName] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const nonWhiteSpaceCharactersRegex = /[^ ]/; 
    const onlyWhiteSpaceCharactersPresentRegex = /^\s+$/;
    const handleCreateChat = (e) => {
        e.preventDefault();
        if(!/[^ ]/.test(newChatName)) {
            console.log('Please enter a non-whitespace character.');
        } else {
        postChat(newChatName, username).then(() => {
            setIsLoading(true)
            setNewChatName('')
            getChatsNames().then((chatsNamesData) => {
            setChatsNames(chatsNamesData);
            setIsLoading(false)
            })
        })
    }
        
    }
    if (isLoading) return ( <p>Loading...</p> )
    return (
        <div>
            <h3>Choose a chat to join</h3>
            <form onSubmit={handleCreateChat}>
                <input
                placeholder='Type name of new chat'
                type="text"
                value={newChatName}
                onChange={((e) => setNewChatName(e.target.value))}
                >    
                </input>
                 {nonWhiteSpaceCharactersRegex.test(newChatName)  &&
                  <button >Click to create a new chat</button> 
                }
                {onlyWhiteSpaceCharactersPresentRegex.test(newChatName) && 
                <p>Please enter a non-whitespace character</p>
                }

            </form>
            <ChatList username={username} setChatsNames={setChatsNames} chatsNames={chatsNames}/>
        </div>
    )
}