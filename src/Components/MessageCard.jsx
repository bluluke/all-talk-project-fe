import { useState, useContext } from 'react';
import { UserContext } from '../contexts/User'

export const MessageCard = ({_id, senderName, messageContent, timeOfSending, handleDeleteMessage, handleEditMessage, setEditInProgress, editInProgress, idOfMessageToEdit, setIdOfMessageToEdit, idOfMessageBeingEdited, setIdOfMessageBeingEdited, deleteInProgress, setDeleteInProgress, idOfMessageToDelete, setIdOfMessageToDelete, editMessage, setEditMessage}) => {
    const [messageToUpdate, setMessageToUpdate] = useState(messageContent)
    const [messageEdited, setMessageEdited] = useState(false);
    const [showDeleteEditButtons, setShowDeleteEditButtons] = useState(false);
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

    const handleEdit = (e) => {
        e.preventDefault();
        setEditMessage(true)
        setIdOfMessageBeingEdited(_id)
    }
    const handleMessageCardClick = (e) => {
        e.preventDefault();
        setIdOfMessageBeingEdited(_id)
        setShowDeleteEditButtons((previousValue) => {
            return !previousValue
        })
    }
    if(deleteInProgress && idOfMessageToDelete === _id) return <p>Delete in progress...</p>
    if(editInProgress && idOfMessageToEdit === _id) return <p>Edit in progress...</p>
    return (
       <div className="message-card" onClick={handleMessageCardClick}>
            <p><span className="sender-name">{senderName}:</span> <span className="message-content">{messageContent}</span></p>
            <p className="time-of-sending">{timeOfSending}</p>
            {user.user === senderName && idOfMessageBeingEdited === _id && showDeleteEditButtons && (
            <div>
                <button className="delete-message-button" onClick={handleDeleteMessagePress}>Delete</button>
                <button className="edit-message-button" onClick={handleEdit}>Edit</button>  
                {editMessage === true && idOfMessageBeingEdited === _id && (
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






