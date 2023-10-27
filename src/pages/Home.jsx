import { ChatList } from "../Components/ChatList"

export const Home = ({username}) => {

    return (
        <div>
            <h3>Choose a chat to join</h3>
            <ChatList username={username}/>
        </div>
    )
}