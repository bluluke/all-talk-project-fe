import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MessageCard } from '../Components/MessageCard';
import { useContext } from 'react';
import { UserContext } from '../contexts/User';


export const MessageList = ({ messageList, setMessageList, handleDeleteMessage, handleEditMessage, setEditInProgress, editInProgress, idOfMessageToEdit, setIdOfMessageToEdit, deleteInProgress, setDeleteInProgress, idOfMessageToDelete, setIdOfMessageToDelete, messageSent}) => {
    const user = useContext(UserContext);
    const messageListRef = useRef(null);
    useLayoutEffect(() => {
      const messageListElement = messageListRef.current;
      if (messageListElement) {
        messageListElement.scrollTop = messageListElement.scrollHeight;
      }
    }, [messageSent]);

    return (
        <section id="message-list" ref={messageListRef}>
            <ul>
                {messageList.map(({_id, senderName, messageContent, timeOfSending }) => {
                    let classForMessageCard;
                    if(user.user === senderName) classForMessageCard = 'this-user-message';
                    else classForMessageCard = 'other-user-message'
                    return <div key={_id} className={classForMessageCard}>
                    <MessageCard _id={_id} senderName={senderName} messageContent={messageContent} timeOfSending={new Date(timeOfSending.$timestamp.t).toLocaleString()} setMessageList={setMessageList} handleDeleteMessage={handleDeleteMessage} handleEditMessage={handleEditMessage} setEditInProgress={setEditInProgress} editInProgress={editInProgress} idOfMessageToEdit={idOfMessageToEdit} setIdOfMessageToEdit={setIdOfMessageToEdit} deleteInProgress={deleteInProgress} setDeleteInProgress={setDeleteInProgress} idOfMessageToDelete={idOfMessageToDelete} setIdOfMessageToDelete={setIdOfMessageToDelete}/>
                </div>
                })}
            </ul>
        </section>
    )
}




