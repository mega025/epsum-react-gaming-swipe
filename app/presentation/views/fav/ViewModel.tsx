import {ApiDelivery} from "../../../data/sources/remote/api/ApiDelivery";
import {getUserUseCase} from "../../../domain/usesCases/userLocal/getUser";
import {useEffect, useState} from "react";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";


const favScreenViewModel = () => {
    const [favListGames, setFavListGames] = useState<[]>([]);
    const [showLoading, setShowLoading] = useState(true);

    const loadFavGames = async (userId: number) => {
        await ApiDelivery.get(`/favgames/user/${userId}`)
            .then((response) => {
                setFavListGames(response.data);
                console.log(response.data);
                setShowLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return{favListGames, setFavListGames, loadFavGames, showLoading}
}

export default {favScreenViewModel}