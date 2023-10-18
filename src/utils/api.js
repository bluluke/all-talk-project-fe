import axios from 'axios';

const allTalkApi = axios.create({
    baseURL: "https://all-talk-api.onrender.com/api"
});

export const getChats = () => {
    let endpoint = '/chats'
    return allTalkApi.get(endpoint).then((res) => {
        return res.data.chats
    })
}

