import axios from "axios";
const IgdbApiDelivery = axios.create({
    baseURL: "https://api.igdb.com/v4/",
    headers: {
        "Content-Type": "text/plain",
        "Client-ID": "rfazmbjne5v3x5o3gxu2pwe8ulwfet",
        "Authorization": "Bearer 4w0wtmi36kvcwk3lqubpby2u93g7cs"
    },

})

export{IgdbApiDelivery};