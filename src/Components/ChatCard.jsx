import { deleteChat, getChatsNames } from "../utils/api"



export const ChatCard = ({ _id, chatName, timeOfcreation, username, chatCreator, setChatsNames }) => {


    const handleDeletechat = () => {
        deleteChat(_id).then(() => {
            getChatsNames().then((chatNamesData) => {
               setChatsNames(chatNamesData)
            })
        })
    }
    return (
        <li>
            <section className="chat-card">
                <h2 className="chat-card-heading">{chatName}</h2>
            </section>
        </li>
    )
}