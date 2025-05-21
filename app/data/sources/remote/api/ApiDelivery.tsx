import axios from "axios";
import {UseUserLocalStorage} from "../../../../presentation/hooks/UseUserLocalStorage";
const ApiDelivery = axios.create({
    baseURL: "http://10.0.2.2:8000/api",
    headers: {
        "Content-Type": "application/json"
    }
})

export{ApiDelivery};