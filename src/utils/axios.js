import axios from "axios"
export const lemonSqueezyApiInstance = axios.create({
    baseURL: `${process.env.LEMON_SQUEEZY_API}`,
    headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`
    }
});