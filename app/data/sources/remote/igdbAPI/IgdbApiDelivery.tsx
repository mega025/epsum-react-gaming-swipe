import axios from "axios";
const IgdbApiDelivery = axios.create({
    baseURL: "https://api.igdb.com/v4/",
    headers: {
        "Content-Type": "application/json",
        "Client-ID": "rfazmbjne5v3x5o3gxu2pwe8ulwfet",
        "Authorization": "Bearer txdkzuet0h8gij9r605z78nkjdbm5h"
    }
})

export{IgdbApiDelivery};