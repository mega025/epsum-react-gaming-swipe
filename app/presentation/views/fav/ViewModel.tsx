import {ApiDelivery} from "../../../data/sources/remote/api/ApiDelivery";
import {getUserUseCase} from "../../../domain/usesCases/userLocal/getUser";
import {useState} from "react";


const FavScreenViewModel = () => {
    const [favListGames, setFavListGames] = useState<[]>([]);
    const [showLoading, setShowLoading] = useState(true);

    const loadFavGames = async () => {
        const user = await getUserUseCase()
        ApiDelivery.get("/favgames/user/1")
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

export default {FavScreenViewModel}