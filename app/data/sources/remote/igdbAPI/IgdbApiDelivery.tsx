import axios from "axios";
const IgdbApiDelivery = axios.create({
    baseURL: "https://api.igdb.com/v4/",
    headers: {
        "Content-Type": "text/plain",
        "Client-ID": "rfazmbjne5v3x5o3gxu2pwe8ulwfet",
        "Authorization": "Bearer k4woof4ddn2v5wrr4t5fb68idch5tu"
    },

})

export{IgdbApiDelivery};