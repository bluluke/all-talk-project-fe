import { useState, useContext } from 'react';
import { UserContext } from '../contexts/User'

export const MessageCard = ({_id, senderName, messageContent, timeOfSending, handleDeleteMessage, handleEditMessage, setEditInProgress, editInProgress, idOfMessageToEdit, setIdOfMessageToEdit, deleteInProgress, setDeleteInProgress, idOfMessageToDelete, setIdOfMessageToDelete}) => {

    const [editMessage, setEditMessage] = useState(false);
    const [messageToUpdate, setMessageToUpdate] = useState(messageContent)
    const user = useContext(UserContext)

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        setEditInProgress(true)
        setIdOfMessageToEdit(_id)
        handleEditMessage(_id, messageToUpdate);
        setEditMessage(false)
    }

    const handleDeleteMessagePress = (e) => {
        e.preventDefault();
        setDeleteInProgress(true)
        setIdOfMessageToDelete(_id)
        handleDeleteMessage(_id)
    }
    if(deleteInProgress && idOfMessageToDelete === _id) return <p>Delete in progress...</p>
    if(editInProgress && idOfMessageToEdit === _id) return <p>Edit in progress...</p>
    return (
       <div className="message-card">
            <p>{senderName}: {messageContent}</p>
            <p className="time-of-sending">{timeOfSending}</p>
            {user.user === senderName && (
            <div>
                <button className="delete-message-button" onClick={handleDeleteMessagePress}>Delete</button>
                <button className="edit-message-button" onClick={() => setEditMessage(true)}>Edit</button>
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