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



