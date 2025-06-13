import axios from "axios";
const IgdbApiDelivery = axios.create({
    baseURL: "https://api.igdb.com/v4/",
    headers: {
        "Content-Type": "text/plain",
        "Client-ID": "rfazmbjne5v3x5o3gxu2pwe8ulwfet",
        "Authorization": "Bearer 92qtv8dcmj45j0fn7lolwu3t8tljjl"
    },

})

export{IgdbApiDelivery};