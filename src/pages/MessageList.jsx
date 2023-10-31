import { MessageCard } from "../Components/MessageCard";

export const MessageList = ({chatid, messageList, setMessageList, username, handleDeleteMessage, handleEditMessage, setEditInProgress, editInProgress, idOfMessageToEdit, setIdOfMessageToEdit, deleteInProgress, setDeleteInProgress, idOfMessageToDelete, setIdOfMessageToDelete}) => {
   let idCount = 1;
    return (
        <section>
            <ul>
                {messageList.map(({_id, senderName, messageContent, timeOfSending }) => {
                    idCount++
                    return <div key={`${_id}${idCount}`} className="individual-message-container">
                    <MessageCard _id={_id} senderName={senderName} messageContent={messageContent} timeOfSending={new Date(timeOfSending.$timestamp.t).toLocaleString()} setMessageList={setMessageList} username={username} handleDeleteMessage={handleDeleteMessage} handleEditMessage={handleEditMessage} setEditInProgress={setEditInProgress} editInProgress={editInProgress} idOfMessageToEdit={idOfMessageToEdit} setIdOfMessageToEdit={setIdOfMessageToEdit} deleteInProgress={deleteInProgress} setDeleteInProgress={setDeleteInProgress} idOfMessageToDelete={idOfMessageToDelete} setIdOfMessageToDelete={setIdOfMessageToDelete} />
                </div>
                })}
            </ul>
        </section>
    )
}