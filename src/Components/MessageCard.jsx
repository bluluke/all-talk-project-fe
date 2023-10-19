export const MessageCard = ({_id, senderName, messageContent}) => {
    return (
       <div className="message-card">
            <p>{senderName}: {messageContent}</p>
            <p>Sent at </p>
       </div>
    )
}