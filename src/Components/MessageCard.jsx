import { deleteMessage } from "../utils/api"
export const MessageCard = ({_id, senderName, messageContent, timeOfSending, setMessageList, chatid, username}) => {
    const handleDeleteMessage = () => {
        deleteMessage(chatid, _id).then((data) => {
        })
        setMessageList((prevMessageList) => {
            const updatedMessageList = prevMessageList.filter(message => message._id !== _id)
            return updatedMessageList;
        })
    }
    return (
       <div className="message-card">
            <p>{senderName}: {messageContent}</p>
            <p>{timeOfSending}</p>
            {username === senderName && (
            <button onClick={handleDeleteMessage}>Delete</button>

        )}
         </div>
    )
}