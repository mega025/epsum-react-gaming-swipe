import axios from "axios";
const IgdbApiDelivery = axios.create({
    baseURL: "https://api.igdb.com/v4/",
    headers: {
        "Content-Type": "text/plain",
        "Client-ID": "rfazmbjne5v3x5o3gxu2pwe8ulwfet",
        "Authorization": "Bearer lced5ylcemw6dnjjocoubi3ae7z6in"
    },

})

export{IgdbApiDelivery};