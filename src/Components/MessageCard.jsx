import { deleteMessage, getSingleChat } from "../utils/api"

export const MessageCard = ({_id, senderName, messageContent, timeOfSending, setMessageList, username, handleDeleteMessage}) => {
    // const handleDeleteMessage = () => {
    //     deleteMessage(chatid, _id).then(() => {
    //         getSingleChat(chatid).then((singleChatData) => {
    //             setMessageList(singleChatData.messages)
    //         })
    //     })
    // }
    return (
       <div className="message-card">
            <p>{senderName}: {messageContent}</p>
            <p>{timeOfSending}</p>
            {username === senderName && (
            <button onClick={() => handleDeleteMessage(_id)}>Delete</button>
        )}
       </div>
    )
}