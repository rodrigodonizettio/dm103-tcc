import axios from 'axios';

const apiGPIOChannelFeed = axios.create({
    baseURL: 'https://api.thingspeak.com/channels/998742/feeds.json?api_key=FS9XJWHHRD8GJZVV&results=1'
});

const apiStageChannelFeed = axios.create({
    baseURL: 'https://api.thingspeak.com/channels/998756/feeds.json?api_key=E0Q0FPKEI9YED8VH&results=1'
});

const apiFermChannelFeed = axios.create({
    baseURL: 'https://api.thingspeak.com/channels/998747/feeds.json?api_key=85EUJOGNPD9S0WGL&results=1'
});

const apiMatChannelFeed = axios.create({
    baseURL: 'https://api.thingspeak.com/channels/998751/feeds.json?api_key=CMRBBZA87WA315AA&results=1'
});

const apiSendStartProcess = axios.create({
    baseURL: ''
});

export { 
    apiGPIOChannelFeed, 
    apiStageChannelFeed,
    apiFermChannelFeed,
    apiMatChannelFeed,
    apiSendStartProcess
};