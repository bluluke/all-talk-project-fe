import { useState, useContext } from 'react';
import { UserContext } from '../contexts/User'

export const MessageCard = ({_id, senderName, messageContent, timeOfSending, handleDeleteMessage, handleEditMessage, setEditInProgress, editInProgress, idOfMessageToEdit, setIdOfMessageToEdit, deleteInProgress, setDeleteInProgress, idOfMessageToDelete, setIdOfMessageToDelete, editMessage, setEditMessage}) => {
    const [messageToUpdate, setMessageToUpdate] = useState(messageContent)
    const [messageEdited, setMessageEdited] = useState(false);
    const user = useContext(UserContext)

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        setMessageEdited(true)
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
                {messageEdited && <p className="message-edited-feedback">Edited</p>}
                {editMessage === true && (
                    <div>
                     <form onSubmit={handleSubmitEdit}>
                     <input className={"edit-message-input"} value={messageToUpdate} onChange={(e) => setMessageToUpdate(e.target.value)} ></input>
                     <button className="submit-edited-message-button">Submit edited message</button>
                     </form>
                    </div>
                )}
            </div>
        )}
       </div>
    )
}