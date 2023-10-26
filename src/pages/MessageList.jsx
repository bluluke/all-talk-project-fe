import { MessageCard } from "../Components/MessageCard";

export const MessageList = ({messageList, setMessageList, chatid}) => {
    return (
        <section>
            <ul>
                {messageList.map(({_id, senderName, messageContent, timeOfSending }) => {
                    return <div key={_id} className="individual-message-container">
                        <MessageCard _id={_id} senderName={senderName} messageContent={messageContent} timeOfSending={new Date(timeOfSending.$timestamp.t).toLocaleString()} setMessageList={setMessageList} chatid={chatid}/>
                    </div>
                })}
            </ul>
        </section>
    )
}