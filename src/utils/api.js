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

export const postMessage = (chatId, _id, senderName, messageContent, timeOfSending) => {
    const postRequestBody = {
        _id,
        senderName,
        messageContent,
        timeOfSending: timeOfSending
    };
    const endpoint = `/chats/${chatId}/messages`;
    return allTalkApi.post(endpoint, postRequestBody)
    .then((res) => {
        return res.data.result
    })
}

export const patchMessage = (chatId, messageId, messageContent) => {
    const endpoint = `/chats/${chatId}/messages/${messageId}`
    const patchRequestBody = {
        messageContent
    }
    return allTalkApi.patch(endpoint, patchRequestBody)
    .then((res) => {
        return res.data.result;
    })
}

export const deleteChat = (id) => {
    const endpoint = `/chats/${id}`
    return allTalkApi.delete(endpoint)
    .then((res) => {
        return res.data.result;
    })
}

export const deleteMessage = (chatId, messageId) => {
    const endpoint = `/chats/${chatId}/messages/${messageId}`
    return allTalkApi.delete(endpoint)
    .then((res) => {
        return res.data.result;
    })
}

export const generateMongoObjectId = () => {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16).padStart(8, '0');
    const randomValue = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
    const incrementingCounter = Math.floor(Math.random() * 4096).toString(16).padStart(4, '0'); // 4 characters for the counter
  
    return (timestamp + randomValue + incrementingCounter).padEnd(24, '0');
  }
  
