import { useState, useContext } from 'react';
import { ChatList } from "../Components/ChatList"
import { getChatsNames, postChat } from "../utils/api"
import { UserContext } from '../contexts/User';

export const Home = () => {
    const [chatsNames, setChatsNames] = useState();
    const [newChatName, setNewChatName] = useState('');
    const [idOfChatToDelete, setIdOfChatToDelete] = useState('');
    const [chatBeingCreated, setChatBeingCreated] = useState(false)
    const { user } = useContext(UserContext)

    const nonWhiteSpaceCharactersRegex = /[^ ]/; 
    const onlyWhiteSpaceCharactersPresentRegex = /^\s+$/;
    const handleCreateChat = (e) => {
        e.preventDefault();
        if(!/[^ ]/.test(newChatName)) {
            console.log('Please enter a non-whitespace character.');
        } else {
        postChat(newChatName, user).then(() => {
            setChatBeingCreated(true)
            setNewChatName('')
            getChatsNames().then((chatsNamesData) => {
            setChatsNames(chatsNamesData);
            setChatBeingCreated(false)
            })
        })
    }
        
    }
    return (
        <div>
            <h3>Choose a chat to join</h3>
            <form onSubmit={handleCreateChat}>
                <input
                    id="chatNameInput"
                    name="chatName"
                    placeholder='Type name of new chat'
                    type="text"
                    value={newChatName}
                    onChange={((e) => setNewChatName(e.target.value))}
                >    
                </input>
                 {nonWhiteSpaceCharactersRegex.test(newChatName)  &&
                  <button id="createChatButton">Click to create a new chat</button> 
                }
                {onlyWhiteSpaceCharactersPresentRegex.test(newChatName) && 
                <p>Please enter a non-whitespace character</p>
                }

            </form>
            {chatBeingCreated && <p>New chat is being created...</p>}
            <ChatList setChatsNames={setChatsNames} chatsNames={chatsNames} idOfChatToDelete={idOfChatToDelete} setIdOfChatToDelete={setIdOfChatToDelete}/>
        </div>
    )
}