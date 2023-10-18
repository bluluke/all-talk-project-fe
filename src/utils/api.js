import axios from 'axios';

const allTalkApi = axios.create({
    baseURL: "https://all-talk-api.onrender.com/api"
});

export const getChats = (fromDate, toDate) => {
    let endpoint = '/chats'
    let fromDateQuery = '';
    if(fromDate) {
        fromDateQuery = 
        endpoint += `?from_date=${fromDate}`;
        if(toDate) {
            endpoint += `&&to_date=${toDate}`
        }
    } else if (toDate) {
        endpoint += `?to_date=${toDate}`
    }
    return allTalkApi.get(endpoint).then((res) => {
        return res.data.chats
    })
}

export const getChatsNames = () => {
    const endpoint = '/chats/names'
    return allTalkApi.get(endpoint).then((res) => {
        return res.data.names;
    })
}

export const getSingleChat = (id) => {
    const endpoint = `/chats/${id}`
    return allTalkApi.get(endpoint).then((res) => {
        console.log('res.data.chat', res.data.chat);
        return res.data.chat
    })
}

export const postChat = (chatName, chatCreator) => {
    const postRequestBody = {
        chatName,
        chatCreator
    };
    const endpoint = `/chats`
    return allTalkApi.post(endpoint, postRequestBody)
    .then((res) => {
        return res.data.result
    })
}

export const postMessage = (id, senderName, messageContent) => {
    const postRequestBody = {
        senderName,
        messageContent
    };
    const endpoint = `/chats/${id}/messages`;
    return allTalkApi.post(endpoint, postRequestBody)
    .then((res) => {
        return res.data.result
    })
}







