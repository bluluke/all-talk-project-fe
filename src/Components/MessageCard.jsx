export const MessageCard = ({_id, senderName, messageContent, timeOfSending}) => {
    return (
       <div className="message-card">
            <p>{senderName}: {messageContent}</p>
            <p>{timeOfSending}</p>
            <button>Delete</button>
       </div>
    )
}