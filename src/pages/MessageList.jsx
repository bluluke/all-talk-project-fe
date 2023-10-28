import { MessageCard } from "../Components/MessageCard";

export const MessageList = ({chatid, messageList, setMessageList, username, handleDeleteMessage, handleEditMessage}) => {
    return (
        <section>
            <ul>
                {messageList.map(({_id, senderName, messageContent, timeOfSending }) => {
                    return <div key={_id} className="individual-message-container">
                        <MessageCard _id={_id} chatid={chatid} senderName={senderName} messageContent={messageContent} timeOfSending={new Date(timeOfSending.$timestamp.t).toLocaleString()} setMessageList={setMessageList} username={username} handleDeleteMessage={handleDeleteMessage} handleEditMessage={handleEditMessage}/>
                    </div>
                })}
            </ul>
        </section>
    )
}