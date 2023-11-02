import { useState, useContext } from 'react';
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { ChatList } from "../Components/ChatList"
import { getChatsNames, postChat } from "../utils/api"
import { UserContext } from '../contexts/User';

export const Home = () => {
    const [chatsNames, setChatsNames] = useState();
    const [newChatName, setNewChatName] = useState('');
    const [idOfChatToDelete, setIdOfChatToDelete] = useState('');
    const [chatBeingCreated, setChatBeingCreated] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(UserContext)

    const nonWhiteSpaceCharactersRegex = /[^ ]/; 
    const onlyWhiteSpaceCharactersPresentRegex = /^\s+$/;

    const handleCreatChatError = () => {
        toast("There was a problem. Chat was not created.", {
            position: "top-center",
            bodyClassName: "toastBody"
        });
    };
    const handleCreateChat = (e) => {
        e.preventDefault();
        postChat(newChatName, user).then(() => {
            setChatBeingCreated(true)
            setNewChatName('')
            getChatsNames().then((chatsNamesData) => {
            setChatsNames(chatsNamesData);
            setChatBeingCreated(false)
            })
        })   
        .catch((error) => {
            handleCreatChatError()
        })   
    }
    return (
        <div>
            {!isLoading &&
                <section>
                    <h2>Type the name of a new chat you want to create below</h2>
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
                </section>
            }
            {chatBeingCreated && <p>New chat is being created...</p>}
            <ChatList setChatsNames={setChatsNames} chatsNames={chatsNames} idOfChatToDelete={idOfChatToDelete} setIdOfChatToDelete={setIdOfChatToDelete} setIsLoading={setIsLoading} isLoading={isLoading}/>
        </div>
    )
}