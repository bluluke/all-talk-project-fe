export const ChatCard = ({ _id, chatName, timeOfcreation, username, chatCreator, setChatsNames }) => {
    return (
        <li>
            <section className="chat-card">
                <h2 className="chat-card-heading">{chatName}</h2>
            </section>
        </li>
    )
}