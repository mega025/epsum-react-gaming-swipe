import {ApiDelivery} from "../../../data/sources/remote/api/ApiDelivery";
import React, { useState } from 'react';
import {FavGame} from "../../../domain/entities/FavGame";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import Toast from "react-native-toast-message";
import {Game} from "../../../domain/entities/Game";


const favScreenViewModel = () => {
    let [favListGames, setFavListGames] = useState<FavGame[]>([]);
    let [showLoading, setShowLoading] = useState(true);

    const loadFavGames = async (userId: number) => {
        ApiDelivery.get(`/favgames/user/${userId}`)
            .then((response) => {
            setFavListGames(response.data);
            console.log(response.data);
            setShowLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const deleteGameFromFav = async (position: number, userId: number) => {
        await ApiDelivery.post(`/favgames/delete/${userId}`, position)
            .then((response) => {
                Toast.show({
                    type: 'success',
                    text1: "The game has been deleted correctly.",
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getPositionGameList = (game: FavGame) => {
        favListGames.forEach(gameOnList => {
            return favListGames.findIndex(game => game.name === gameOnList.name);
        })
    }

    return{
        favListGames,
        setFavListGames,
        loadFavGames,
        showLoading,
        deleteGameFromFav
    }
}

export default {favScreenViewModel}