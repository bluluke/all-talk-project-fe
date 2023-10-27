export const ChatCard = ({ _id, chatName, timeOfcreation, username, chatCreator }) => {
    return (
        <li>
            <section className="chat-card">
                <h2 className="chat-card-heading">{chatName}</h2>

             {chatCreator === username && ( 
                    <button>Delete</button>
                 )} 

            </section>
        </li>
    )
}