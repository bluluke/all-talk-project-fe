import { useState } from 'react';
import { deleteMessage, getSingleChat } from "../utils/api"

export const MessageCard = ({_id, chatid, senderName, messageContent, timeOfSending, setMessageList, username, handleDeleteMessage, handleEditMessage}) => {
    // const handleDeleteMessage = () => {
    //     deleteMessage(chatid, _id).then(() => {
    //         getSingleChat(chatid).then((singleChatData) => {
    //             setMessageList(singleChatData.messages)
    //         })
    //     })
    // }
    const [editMessage, setEditMessage] = useState(false);
    const [messageToUpdate, setMessageToUpdate] = useState(messageContent)
    const handleSubmitEdit = (e) => {
        e.preventDefault();
        handleEditMessage(_id, messageToUpdate);
        setEditMessage(false)
        getSingleChat(chatid).then((updatedChatData) => {
            setMessageList(updatedChatData.messages)
        })
    }
    return (
       <div className="message-card">
            <p>{senderName}: {messageContent}</p>
            <p>{timeOfSending}</p>
            {username === senderName && (
            <div>
                <button onClick={() => handleDeleteMessage(_id)}>Delete</button>
                <button onClick={() => setEditMessage(true)}>Edit</button>
                {editMessage === true && (
                    <div>
                     <br></br>   
                     <form onSubmit={handleSubmitEdit}>
                     <input value={messageToUpdate} onChange={(e) => setMessageToUpdate(e.target.value)} ></input>
                     <button>Submit edited message</button>
                     </form>
                    </div>
                )}
            </div>
        )}
       </div>
    )
}