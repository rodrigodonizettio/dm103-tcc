import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.thingspeak.com/channels/983799/fields/1.json?api_key=AKAB42W53OVKOZ5R&results=1'
});

export default api;